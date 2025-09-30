import { getSwellClient } from 'lib/swell';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reportType = searchParams.get('type') || 'sales';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const period = searchParams.get('period') || '30d';

    const SwellClient = getSwellClient();

    let reportData;

    switch (reportType) {
      case 'sales':
        reportData = await getSalesReport(SwellClient, { startDate, endDate, period });
        break;
      case 'products':
        reportData = await getProductsReport(SwellClient, { startDate, endDate, period });
        break;
      case 'customers':
        reportData = await getCustomersReport(SwellClient, { startDate, endDate, period });
        break;
      case 'inventory':
        reportData = await getInventoryReport(SwellClient);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid report type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      reportType,
      period,
      data: reportData
    });

  } catch (error) {
    console.error('Reports API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}

async function getSalesReport(SwellClient: any, params: any) {
  try {
        // Get orders for the specified period
        // Note: Swell doesn't have a direct getOrders method in the current schema
        // This would need to be implemented based on your Swell setup
        const orders: any[] = [];
    
    // Calculate sales metrics
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.grandTotal || 0), 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Group by status
    const ordersByStatus = orders.reduce((acc: any, order: any) => {
      const status = order.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      ordersByStatus,
      orders: orders.slice(0, 10) // Return first 10 orders for details
    };
  } catch (error) {
    console.error('Error generating sales report:', error);
    return {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      ordersByStatus: {},
      orders: []
    };
  }
}

async function getProductsReport(SwellClient: any, params: any) {
  try {
    // Get all products
    const { data } = await SwellClient.getProducts({});
    const products = data.products.results || [];

        // Get orders to calculate product performance
        // Note: Swell doesn't have a direct getOrders method in the current schema
        const orders: any[] = [];
    
    // Calculate product sales
    const productSales = new Map();
    
    orders.forEach((order: any) => {
      if (order.items) {
        order.items.forEach((item: any) => {
          const productId = item.product?.id;
          if (productId) {
            const current = productSales.get(productId) || {
              productId,
              productName: item.product?.name || 'Unknown',
              quantitySold: 0,
              revenue: 0
            };
            current.quantitySold += item.quantity || 0;
            current.revenue += (item.price || 0) * (item.quantity || 0);
            productSales.set(productId, current);
          }
        });
      }
    });

    return {
      totalProducts: products.length,
      topSellingProducts: Array.from(productSales.values())
        .sort((a, b) => b.quantitySold - a.quantitySold)
        .slice(0, 10),
      topRevenueProducts: Array.from(productSales.values())
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10)
    };
  } catch (error) {
    console.error('Error generating products report:', error);
    return {
      totalProducts: 0,
      topSellingProducts: [],
      topRevenueProducts: []
    };
  }
}

async function getCustomersReport(SwellClient: any, params: any) {
  try {
        // Get customers
        // Note: Swell doesn't have a direct getCustomers method in the current schema
        const customers: any[] = [];

        // Get orders to calculate customer metrics
        // Note: Swell doesn't have a direct getOrders method in the current schema
        const orders: any[] = [];
    
    // Calculate customer metrics
    const customerOrders = new Map();
    
    orders.forEach((order: any) => {
      const customerId = order.customer?.id;
      if (customerId) {
        const current = customerOrders.get(customerId) || {
          customerId,
          customerName: `${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`.trim(),
          orderCount: 0,
          totalSpent: 0
        };
        current.orderCount += 1;
        current.totalSpent += order.grandTotal || 0;
        customerOrders.set(customerId, current);
      }
    });

    return {
      totalCustomers: customers.length,
      activeCustomers: customerOrders.size,
      topCustomers: Array.from(customerOrders.values())
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 10)
    };
  } catch (error) {
    console.error('Error generating customers report:', error);
    return {
      totalCustomers: 0,
      activeCustomers: 0,
      topCustomers: []
    };
  }
}

async function getInventoryReport(SwellClient: any) {
  try {
    // Get all products with inventory data
    const { data } = await SwellClient.getProducts({});
    const products = data.products.results || [];

    const inventoryData = products.map((product: any) => ({
      id: product.id,
      name: product.name,
      sku: product.sku,
      stockLevel: product.stockLevel,
      stockTracking: product.stockTracking,
      stockPurchasable: product.stockPurchasable,
      price: product.price,
      status: product.stockLevel > 0 ? 'in_stock' : 'out_of_stock'
    }));

    const lowStockProducts = inventoryData.filter((item: any) => 
      item.stockLevel > 0 && item.stockLevel < 10
    );

    const outOfStockProducts = inventoryData.filter((item: any) => 
      item.stockLevel === 0
    );

    return {
      totalProducts: products.length,
      inStockProducts: inventoryData.filter((item: any) => item.stockLevel > 0).length,
      outOfStockProducts: outOfStockProducts.length,
      lowStockProducts: lowStockProducts.length,
      lowStockItems: lowStockProducts,
      outOfStockItems: outOfStockProducts
    };
  } catch (error) {
    console.error('Error generating inventory report:', error);
    return {
      totalProducts: 0,
      inStockProducts: 0,
      outOfStockProducts: 0,
      lowStockProducts: 0,
      lowStockItems: [],
      outOfStockItems: []
    };
  }
}
