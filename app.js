const foodData = [
    { id: 1, name: '黄焖鸡米饭', price: 18, category: '快餐', image: '🍗', rating: 4.8, sales: 1280, shopName: '美味小吃店' },
    { id: 2, name: '麻辣香锅', price: 25, category: '快餐', image: '🌶️', rating: 4.9, sales: 856, shopName: '川味轩' },
    { id: 3, name: '芝士焗饭', price: 22, category: '快餐', image: '🍛', rating: 4.7, sales: 567, shopName: '西式简餐' },
    { id: 4, name: '珍珠奶茶', price: 12, category: '饮品', image: '🧋', rating: 4.6, sales: 2340, shopName: '茶颜悦色' },
    { id: 5, name: '柠檬茶', price: 10, category: '饮品', image: '🍋', rating: 4.5, sales: 1890, shopName: '果茶坊' },
    { id: 6, name: '草莓蛋糕', price: 18, category: '甜点', image: '🍰', rating: 4.9, sales: 678, shopName: '甜蜜时光' },
    { id: 7, name: '提拉米苏', price: 20, category: '甜点', image: '🍮', rating: 4.8, sales: 432, shopName: '甜蜜时光' },
    { id: 8, name: '炸鸡', price: 28, category: '小吃', image: '🍟', rating: 4.7, sales: 1567, shopName: '肯德基' },
    { id: 9, name: '烤肠', price: 6, category: '小吃', image: '🌭', rating: 4.4, sales: 3450, shopName: '小吃摊' },
    { id: 10, name: '牛肉面', price: 20, category: '快餐', image: '🍜', rating: 4.6, sales: 987, shopName: '兰州拉面' },
    { id: 11, name: '冰咖啡', price: 15, category: '饮品', image: '☕', rating: 4.5, sales: 765, shopName: '瑞幸咖啡' },
    { id: 12, name: '蛋挞', price: 8, category: '甜点', image: '🥚', rating: 4.7, sales: 2345, shopName: '甜蜜时光' },
    { id: 13, name: '汉堡套餐', price: 35, category: '快餐', image: '🍔', rating: 4.8, sales: 1678, shopName: '麦当劳' },
    { id: 14, name: '寿司拼盘', price: 45, category: '快餐', image: '🍣', rating: 4.9, sales: 345, shopName: '日式料理' },
    { id: 15, name: '冰淇淋', price: 12, category: '甜点', image: '🍦', rating: 4.6, sales: 1234, shopName: '蜜雪冰城' },
];

const mockOrders = [
    { id: 1, foodName: '黄焖鸡米饭 x1', price: 18, address: '男生宿舍3号楼 301', phone: '138****1234', status: 'waiting', distance: '0.5km', tips: 2 },
    { id: 2, foodName: '麻辣香锅 x1 + 珍珠奶茶 x2', price: 49, address: '女生宿舍5号楼 205', phone: '139****5678', status: 'waiting', distance: '0.8km', tips: 3 },
    { id: 3, foodName: '芝士焗饭 x1', price: 22, address: '图书馆二楼A区', phone: '137****9012', status: 'waiting', distance: '1.2km', tips: 2 },
    { id: 4, foodName: '炸鸡套餐 x1', price: 28, address: '教学楼C座101', phone: '136****3456', status: 'waiting', distance: '0.6km', tips: 4 },
    { id: 5, foodName: '草莓蛋糕 x2', price: 36, address: '研究生宿舍1号楼 402', phone: '135****7890', status: 'waiting', distance: '1.0km', tips: 3 },
];

let users = [];
let currentUser = null;
let cart = [];
let orders = [];
let userOrders = [];
let riderStats = { todayOrders: 0, todayIncome: 0, totalBalance: 0 };
let transactions = [];
let merchants = [];
let selectedRechargeAmount = 0;

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    const bottomNav = document.getElementById('bottomNav');
    if (['orderPage', 'riderPage', 'profilePage'].includes(pageId)) {
        bottomNav.style.display = 'flex';
        updateNavActive(pageId);
    } else {
        bottomNav.style.display = 'none';
    }
}

function updateNavActive(pageId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageId) {
            btn.classList.add('active');
        }
    });
}

function saveUsers() {
    localStorage.setItem('campusUsers', JSON.stringify(users));
}

function loadUsers() {
    const saved = localStorage.getItem('campusUsers');
    if (saved) {
        users = JSON.parse(saved);
    }
}

function saveCart() {
    localStorage.setItem('campusCart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('campusCart');
    if (saved) {
        cart = JSON.parse(saved);
    }
}

function saveCurrentUser(user) {
    localStorage.setItem('campusCurrentUser', JSON.stringify(user));
}

function loadCurrentUser() {
    const saved = localStorage.getItem('campusCurrentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
    }
}

function saveOrders() {
    localStorage.setItem('campusOrders', JSON.stringify(orders));
}

function loadOrders() {
    const saved = localStorage.getItem('campusOrders');
    if (saved) {
        orders = JSON.parse(saved);
    } else {
        orders = [...mockOrders];
        saveOrders();
    }
}

function saveUserOrders() {
    localStorage.setItem('campusUserOrders', JSON.stringify(userOrders));
}

function loadUserOrders() {
    const saved = localStorage.getItem('campusUserOrders');
    if (saved) {
        userOrders = JSON.parse(saved);
    }
}

function saveRiderStats() {
    localStorage.setItem('campusRiderStats', JSON.stringify(riderStats));
}

function loadRiderStats() {
    const saved = localStorage.getItem('campusRiderStats');
    if (saved) {
        riderStats = JSON.parse(saved);
    }
}

function saveTransactions() {
    localStorage.setItem('campusTransactions', JSON.stringify(transactions));
}

function loadTransactions() {
    const saved = localStorage.getItem('campusTransactions');
    if (saved) {
        transactions = JSON.parse(saved);
    }
}

function saveMerchants() {
    localStorage.setItem('campusMerchants', JSON.stringify(merchants));
}

function loadMerchants() {
    const saved = localStorage.getItem('campusMerchants');
    if (saved) {
        merchants = JSON.parse(saved);
    }
}

function updateCartUI() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    document.getElementById('cartCount').textContent = cartCount;
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
    document.getElementById('cartTotal').textContent = totalPrice.toFixed(2);
    
    renderCartItems();
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-gray-400 py-4">购物车为空</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="flex items-center gap-3">
            <div class="text-2xl">${item.image}</div>
            <div class="flex-1">
                <div class="font-medium">${item.name}</div>
                <div class="text-red-500">¥${item.price}</div>
            </div>
            <div class="flex items-center gap-2">
                <button class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');
}

function updateQuantity(foodId, delta) {
    const item = cart.find(item => item.id === foodId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== foodId);
        }
        saveCart();
        updateCartUI();
        
        // 更新待付款订单
        if (currentUser) {
            userOrders = userOrders.filter(o => !(o.status === 'unpaid' && o.userId === currentUser.phone));
            
            cart.forEach(item => {
                for (let i = 0; i < item.quantity; i++) {
                    const unpaidOrder = {
                        id: Date.now() + i,
                        foodName: `${item.name} x1`,
                        price: item.price,
                        address: '用户地址',
                        phone: currentUser.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
                        status: 'unpaid',
                        distance: '0km',
                        tips: 0,
                        userId: currentUser.phone,
                        foodId: item.id
                    };
                    userOrders.push(unpaidOrder);
                }
            });
            
            saveUserOrders();
            updateOrderStats();
        }
    }
}

function addToCart(food) {
    const existing = cart.find(item => item.id === food.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...food, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    
    // 更新待付款订单：购物车中有几份食物就有几单待付款
    if (currentUser) {
        // 先删除该用户所有待付款订单
        userOrders = userOrders.filter(o => !(o.status === 'unpaid' && o.userId === currentUser.phone));
        
        // 根据购物车内容创建待付款订单（每个商品一份）
        cart.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                const unpaidOrder = {
                    id: Date.now() + i,
                    foodName: `${item.name} x1`,
                    price: item.price,
                    address: '用户地址',
                    phone: currentUser.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
                    status: 'unpaid',
                    distance: '0km',
                    tips: 0,
                    userId: currentUser.phone,
                    foodId: item.id
                };
                userOrders.push(unpaidOrder);
            }
        });
        
        saveUserOrders();
        updateOrderStats();
    }
    
    showToast('已添加到购物车');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-6 py-3 rounded-xl text-sm z-50';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    return stars;
}

function getStatusText(status) {
    const statusMap = {
        'unpaid': '待付款',
        'waiting': '待接单',
        'delivering': '配送中',
        'completed': '已完成'
    };
    return statusMap[status] || status;
}

function getStatusColor(status) {
    const colorMap = {
        'unpaid': 'bg-red-100 text-red-600',
        'waiting': 'bg-yellow-100 text-yellow-600',
        'delivering': 'bg-blue-100 text-blue-600',
        'completed': 'bg-green-100 text-green-600'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-600';
}

function renderAllOrders(filter = '全部') {
    const orderList = document.getElementById('allOrdersList');
    const emptyOrders = document.getElementById('emptyOrders');
    
    let filteredOrders = userOrders;
    if (filter !== '全部') {
        const statusMap = {
            '待付款': 'unpaid',
            '待接单': 'waiting',
            '配送中': 'delivering',
            '已完成': 'completed'
        };
        filteredOrders = userOrders.filter(o => o.status === statusMap[filter]);
    }
    
    if (filteredOrders.length === 0) {
        orderList.innerHTML = '';
        emptyOrders.style.display = 'block';
        return;
    }
    
    emptyOrders.style.display = 'none';
    orderList.innerHTML = filteredOrders.map(order => `
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden order-card" data-order-id="${order.id}">
            <div class="p-4 cursor-pointer">
                <div class="flex items-center justify-between mb-3">
                    <span class="font-semibold">订单 #${order.id}</span>
                    <div class="flex items-center gap-2">
                        <span class="text-xs ${getStatusColor(order.status)} px-2 py-1 rounded-full">${getStatusText(order.status)}</span>
                        <span class="material-icons text-gray-400 text-sm transition-transform">chevron_right</span>
                    </div>
                </div>
                <div class="text-gray-600 text-sm mb-2">${order.foodName}</div>
                <div class="flex items-center justify-between">
                    <span class="text-red-500 font-bold">¥${order.price.toFixed(2)}</span>
                    ${order.status === 'unpaid' ? `
                        <button onclick="payOrder(${order.id})" class="bg-red-500 text-white px-4 py-1.5 rounded-xl text-sm">
                            去支付
                        </button>
                    ` : ''}
                </div>
            </div>
            <div class="px-4 pb-4 order-detail hidden">
                <div class="border-t pt-4 space-y-2">
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                        <span class="material-icons text-xs">location_on</span>
                        <span>${order.address}</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                        <span class="material-icons text-xs">phone</span>
                        <span>${order.phone}</span>
                    </div>
                    ${order.distance !== '0km' ? `
                        <div class="flex items-center gap-2 text-xs text-gray-500">
                            <span class="material-icons text-xs">directions_walk</span>
                            <span>${order.distance}</span>
                        </div>
                    ` : ''}
                    ${order.tips > 0 ? `
                        <div class="flex items-center gap-2 text-xs text-gray-500">
                            <span class="material-icons text-xs">tip</span>
                            <span>配送费 ¥${order.tips}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    // 添加点击展开/收起效果
    document.querySelectorAll('.order-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') {
                const detail = this.querySelector('.order-detail');
                const icon = this.querySelector('.material-icons');
                detail.classList.toggle('hidden');
                icon.style.transform = detail.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(90deg)';
            }
        });
    });
}

function payOrder(orderId) {
    const order = userOrders.find(o => o.id === orderId);
    if (!order || order.status !== 'unpaid') return;
    
    if (!currentUser) {
        showToast('请先登录');
        return;
    }
    
    const currentBalance = currentUser.balance || 0;
    if (currentBalance < order.price) {
        const deficit = (order.price - currentBalance).toFixed(2);
        showToast(`余额不足，还差¥${deficit}，请先充值`);
        setTimeout(() => {
            renderTransactions();
            showPage('walletPage');
        }, 1500);
        return;
    }
    
    currentUser.balance = currentBalance - order.price;
    const userIndex = users.findIndex(u => u.phone === currentUser.phone);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
    }
    
    saveUsers();
    saveCurrentUser(currentUser);
    addTransaction('订单支付', -order.price);
    updateBalanceDisplay();
    updateProfile();
    
    order.status = 'waiting';
    
    const newOrder = {
        id: orders.length + 1,
        foodName: order.foodName,
        price: order.price,
        address: order.address,
        phone: order.phone,
        status: 'waiting',
        distance: Math.random() > 0.5 ? '0.8km' : '1.2km',
        tips: Math.floor(Math.random() * 3) + 2,
        userId: currentUser.phone
    };
    
    orders.push(newOrder);
    saveOrders();
    
    saveUserOrders();
    updateOrderStats();
    renderAllOrders();
    renderOrderList();
    
    showToast('支付成功，等待骑手接单');
}

function renderFoodList(category = '全部') {
    const foodList = document.getElementById('foodList');
    const filtered = category === '全部' ? foodData : foodData.filter(item => item.category === category);
    
    foodList.innerHTML = filtered.map(food => `
        <div class="bg-white rounded-2xl shadow-lg p-4 flex gap-4">
            <div class="text-5xl">${food.image}</div>
            <div class="flex-1">
                <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-gray-800">${food.name}</h3>
                </div>
                <p class="text-xs text-gray-500 mb-1">${food.shopName}</p>
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-yellow-500 text-sm">${renderStars(food.rating)}</span>
                    <span class="text-xs text-gray-400">${food.rating}</span>
                    <span class="text-xs text-gray-400">|</span>
                    <span class="text-xs text-gray-400">月售${food.sales}+</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-red-500 font-bold">¥${food.price}</span>
                    <button onclick="addToCart(${JSON.stringify(food).replace(/"/g, '&quot;')})" class="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm">
                        <span class="material-icons text-sm">add</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderOrderList() {
    const orderList = document.getElementById('orderList');
    const emptyOrder = document.getElementById('emptyOrder');
    
    // 只显示等待接单的订单
    const waitingOrders = orders.filter(o => o.status === 'waiting');
    
    if (waitingOrders.length === 0) {
        orderList.innerHTML = '';
        emptyOrder.style.display = 'block';
        return;
    }
    
    emptyOrder.style.display = 'none';
    orderList.innerHTML = waitingOrders.map(order => `
        <div class="bg-white rounded-2xl shadow-lg p-4">
            <div class="flex items-center justify-between mb-3">
                <span class="font-semibold">订单 #${order.id}</span>
                <span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">待接单</span>
            </div>
            <div class="text-gray-600 mb-1">${order.foodName}</div>
            <div class="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <span class="material-icons text-xs">location_on</span>
                <span>${order.address}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <span class="material-icons text-xs">directions_walk</span>
                <span>${order.distance}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span class="material-icons text-xs">phone</span>
                <span>${order.phone}</span>
            </div>
            <div class="flex items-center justify-between">
                <div>
                    <span class="text-red-500 font-bold">配送费 ¥${order.tips}</span>
                </div>
                <button onclick="acceptOrder(${order.id})" class="bg-blue-500 text-white px-6 py-2 rounded-xl text-sm">
                    接单
                </button>
            </div>
        </div>
    `).join('');
}

function acceptOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = 'delivering';
        riderStats.todayOrders++;
        riderStats.todayIncome += order.tips;
        
        // 更新用户订单状态为配送中
        const userOrder = userOrders.find(uo => uo.id === orderId);
        if (userOrder) {
            userOrder.status = 'delivering';
            saveUserOrders();
            updateOrderStats();
        }
        
        saveOrders();
        saveRiderStats();
        updateRiderStats();
        showToast('接单成功！');
        renderOrderList();
    }
}

function settleRiderIncome() {
    if (riderStats.todayIncome <= 0) {
        showToast('暂无可结算的收入');
        return;
    }
    
    if (!currentUser) {
        showToast('请先登录');
        return;
    }
    
    // 将配送中的订单标记为已完成
    const deliveringOrders = orders.filter(o => o.status === 'delivering');
    deliveringOrders.forEach(order => {
        order.status = 'completed';
        
        // 更新用户订单状态
        const userOrder = userOrders.find(uo => uo.id === order.id);
        if (userOrder) {
            userOrder.status = 'completed';
        }
    });
    
    saveOrders();
    saveUserOrders();
    updateOrderStats();
    
    currentUser.balance = (currentUser.balance || 0) + riderStats.todayIncome;
    
    const userIndex = users.findIndex(u => u.phone === currentUser.phone);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
    }
    
    saveUsers();
    saveCurrentUser(currentUser);
    addTransaction('骑手收入', riderStats.todayIncome);
    
    riderStats.totalBalance += riderStats.todayIncome;
    const settledAmount = riderStats.todayIncome;
    riderStats.todayIncome = 0;
    
    saveRiderStats();
    updateRiderStats();
    updateBalanceDisplay();
    
    showToast(`结算成功！+¥${settledAmount}`);
}

function updateRiderStats() {
    document.getElementById('todayOrders').textContent = riderStats.todayOrders;
    document.getElementById('todayIncome').textContent = `¥${riderStats.todayIncome}`;
    document.getElementById('riderBalance').textContent = `¥${riderStats.totalBalance.toFixed(2)}`;
}

function updateProfile() {
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userPhone').textContent = currentUser.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        updateBalanceDisplay();
        updateOrderStats();
    }
}

function updateBalanceDisplay() {
    const balance = currentUser ? (currentUser.balance || 0) : 0;
    document.getElementById('profileBalance').textContent = `¥${balance.toFixed(2)}`;
    document.getElementById('walletBalance').textContent = balance.toFixed(2);
}

function updateOrderStats() {
    const unpaid = userOrders.filter(o => o.status === 'unpaid').length;
    const pending = userOrders.filter(o => o.status === 'waiting').length;
    const delivering = userOrders.filter(o => o.status === 'delivering').length;
    const completed = userOrders.filter(o => o.status === 'completed').length;
    
    document.getElementById('statUnpaid').textContent = unpaid;
    document.getElementById('statPending').textContent = pending;
    document.getElementById('statDelivering').textContent = delivering;
    document.getElementById('statCompleted').textContent = completed;
}

function renderTransactions() {
    const transactionList = document.getElementById('transactionList');
    if (transactions.length === 0) {
        transactionList.innerHTML = '<p class="text-center text-gray-400 py-4">暂无交易记录</p>';
        return;
    }
    
    transactionList.innerHTML = transactions.slice(-10).reverse().map(t => `
        <div class="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
            <div>
                <div class="font-medium text-sm">${t.type}</div>
                <div class="text-xs text-gray-400">${t.date}</div>
            </div>
            <div class="${t.amount > 0 ? 'text-green-500' : 'text-red-500'} font-semibold">
                ${t.amount > 0 ? '+' : ''}¥${t.amount.toFixed(2)}
            </div>
        </div>
    `).join('');
}

function addTransaction(type, amount) {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    transactions.push({
        type,
        amount,
        date: dateStr
    });
    
    saveTransactions();
    renderTransactions();
}

function checkGuide() {
    const guideShown = localStorage.getItem('campusGuideShown');
    if (!guideShown && currentUser) {
        document.getElementById('guideModal').style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadCart();
    loadCurrentUser();
    loadOrders();
    loadUserOrders();
    loadRiderStats();
    loadTransactions();
    loadMerchants();

    updateCartUI();
    renderFoodList();
    renderOrderList();
    updateRiderStats();
    updateProfile();

    document.getElementById('loginBtn').addEventListener('click', () => {
        const phone = document.getElementById('loginPhone').value;
        const pwd = document.getElementById('loginPwd').value;
        
        if (!phone || !pwd) {
            showToast('请填写完整信息');
            return;
        }
        
        const user = users.find(u => u.phone === phone && u.password === pwd);
        if (user) {
            currentUser = user;
            saveCurrentUser(user);
            showPage('rolePage');
            updateProfile();
            checkGuide();
        } else {
            showToast('账号或密码错误');
        }
    });

    document.getElementById('goRegister').addEventListener('click', (e) => {
        e.preventDefault();
        showPage('registerPage');
    });

    document.getElementById('backToLogin').addEventListener('click', () => {
        showPage('loginPage');
    });

    document.getElementById('registerBtn').addEventListener('click', () => {
        const phone = document.getElementById('regPhone').value;
        const pwd = document.getElementById('regPwd').value;
        const pwd2 = document.getElementById('regPwd2').value;
        const name = document.getElementById('regName').value;
        
        if (!phone || !pwd || !pwd2 || !name) {
            showToast('请填写完整信息');
            return;
        }
        
        if (pwd !== pwd2) {
            showToast('两次密码不一致');
            return;
        }
        
        if (users.find(u => u.phone === phone)) {
            showToast('该手机号已注册');
            return;
        }
        
        const newUser = { phone, password: pwd, name, balance: 0 };
        users.push(newUser);
        saveUsers();
        showToast('注册成功');
        showPage('loginPage');
    });

    document.getElementById('userBtn').addEventListener('click', () => {
        showPage('orderPage');
    });

    document.getElementById('riderBtn').addEventListener('click', () => {
        showPage('riderPage');
    });

    document.getElementById('merchantBtn').addEventListener('click', () => {
        showPage('merchantPage');
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('campusCurrentUser');
        showPage('loginPage');
    });

    document.getElementById('logoutBtn2').addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('campusCurrentUser');
        showPage('loginPage');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const pageId = btn.dataset.page;
            showPage(pageId);
        });
    });

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('active', 'bg-red-500', 'text-white');
                b.classList.add('bg-gray-100', 'text-gray-600');
            });
            btn.classList.add('active', 'bg-red-500', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-gray-600');
            renderFoodList(btn.textContent);
        });
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = foodData.filter(item => 
            item.name.toLowerCase().includes(keyword) || 
            item.shopName.toLowerCase().includes(keyword)
        );
        const foodList = document.getElementById('foodList');
        
        if (filtered.length === 0) {
            foodList.innerHTML = '<p class="text-center text-gray-400 py-8">暂无匹配商品</p>';
            return;
        }
        
        foodList.innerHTML = filtered.map(food => `
            <div class="bg-white rounded-2xl shadow-lg p-4 flex gap-4">
                <div class="text-5xl">${food.image}</div>
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <h3 class="font-semibold text-gray-800">${food.name}</h3>
                    </div>
                    <p class="text-xs text-gray-500 mb-1">${food.shopName}</p>
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-yellow-500 text-sm">${renderStars(food.rating)}</span>
                        <span class="text-xs text-gray-400">${food.rating}</span>
                        <span class="text-xs text-gray-400">|</span>
                        <span class="text-xs text-gray-400">月售${food.sales}+</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-red-500 font-bold">¥${food.price}</span>
                        <button onclick="addToCart(${JSON.stringify(food).replace(/"/g, '&quot;')})" class="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm">
                            <span class="material-icons text-sm">add</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    });

    document.getElementById('cartCount').addEventListener('click', () => {
        const cartPanel = document.getElementById('cartPanel');
        cartPanel.style.display = cartPanel.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('closeCart').addEventListener('click', () => {
        document.getElementById('cartPanel').style.display = 'none';
    });

    document.getElementById('submitOrderBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('购物车为空');
            return;
        }
        
        const cartPanel = document.getElementById('cartPanel');
        cartPanel.style.display = cartPanel.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('购物车为空');
            return;
        }
        
        if (!currentUser) {
            showToast('请先登录');
            return;
        }
        
        const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const currentBalance = currentUser.balance || 0;
        
        if (currentBalance < totalAmount) {
            const deficit = (totalAmount - currentBalance).toFixed(2);
            showToast(`余额不足，还差¥${deficit}，请先充值`);
            
            setTimeout(() => {
                renderTransactions();
                showPage('walletPage');
            }, 1500);
            return;
        }
        
        // 扣款
        currentUser.balance = currentBalance - totalAmount;
        
        const userIndex = users.findIndex(u => u.phone === currentUser.phone);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
        }
        
        saveUsers();
        saveCurrentUser(currentUser);
        addTransaction('订单支付', -totalAmount);
        updateBalanceDisplay();
        updateProfile();
        
        // 创建订单（已支付，状态为待接单）
        const newOrder = {
            id: orders.length + 1,
            foodName: cart.map(item => `${item.name} x${item.quantity}`).join(' + '),
            price: totalAmount,
            address: '用户地址',
            phone: currentUser.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            status: 'waiting',
            distance: Math.random() > 0.5 ? '0.8km' : '1.2km',
            tips: Math.floor(Math.random() * 3) + 2,
            userId: currentUser.phone
        };
        
        orders.push(newOrder);
        saveOrders();
        
        // 移除待付款订单并添加新的待接单订单（合并为一单）
        userOrders = userOrders.filter(o => !(o.status === 'unpaid' && o.userId === currentUser.phone));
        userOrders.push({
            ...newOrder,
            status: 'waiting'
        });
        saveUserOrders();
        updateOrderStats();
        
        // 清空购物车
        cart = [];
        saveCart();
        updateCartUI();
        document.getElementById('cartPanel').style.display = 'none';
        showToast('订单提交成功，等待骑手接单');
        
        // 刷新接单页面的订单列表
        renderOrderList();
    });

    document.getElementById('refreshOrders').addEventListener('click', () => {
        renderOrderList();
        showToast('已刷新订单列表');
    });

    document.getElementById('settleBtn').addEventListener('click', () => {
        settleRiderIncome();
    });

    document.getElementById('openWallet').addEventListener('click', () => {
        renderTransactions();
        showPage('walletPage');
    });

    document.getElementById('backFromWallet').addEventListener('click', () => {
        showPage('profilePage');
    });

    document.querySelectorAll('.recharge-amount').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.recharge-amount').forEach(b => {
                b.classList.remove('border-red-500', 'bg-red-50');
                b.classList.add('border-gray-200');
            });
            btn.classList.add('border-red-500', 'bg-red-50');
            btn.classList.remove('border-gray-200');
            selectedRechargeAmount = parseInt(btn.dataset.amount);
        });
    });

    document.getElementById('confirmRecharge').addEventListener('click', () => {
        if (selectedRechargeAmount <= 0) {
            showToast('请选择充值金额');
            return;
        }
        
        if (!currentUser) {
            showToast('请先登录');
            return;
        }
        
        currentUser.balance = (currentUser.balance || 0) + selectedRechargeAmount;
        
        const userIndex = users.findIndex(u => u.phone === currentUser.phone);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
        }
        
        saveUsers();
        saveCurrentUser(currentUser);
        addTransaction('账户充值', selectedRechargeAmount);
        updateBalanceDisplay();
        updateProfile();
        showToast(`充值成功！+¥${selectedRechargeAmount}`);
        
        selectedRechargeAmount = 0;
        document.querySelectorAll('.recharge-amount').forEach(b => {
            b.classList.remove('border-red-500', 'bg-red-50');
            b.classList.add('border-gray-200');
        });
    });

    document.getElementById('backFromMerchant').addEventListener('click', () => {
        showPage('rolePage');
    });

    document.getElementById('submitMerchant').addEventListener('click', () => {
        const shopName = document.getElementById('shopName').value;
        const shopType = document.getElementById('shopType').value;
        const shopAddress = document.getElementById('shopAddress').value;
        const shopPhone = document.getElementById('shopPhone').value;
        const shopLicense = document.getElementById('shopLicense').value;
        const shopDesc = document.getElementById('shopDesc').value;
        
        if (!shopName || !shopType || !shopAddress || !shopPhone || !shopLicense) {
            showToast('请填写完整信息');
            return;
        }
        
        const newMerchant = {
            id: merchants.length + 1,
            shopName,
            shopType,
            shopAddress,
            shopPhone,
            shopLicense,
            shopDesc,
            userId: currentUser ? currentUser.phone : null,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        merchants.push(newMerchant);
        saveMerchants();
        
        document.getElementById('shopName').value = '';
        document.getElementById('shopType').value = '';
        document.getElementById('shopAddress').value = '';
        document.getElementById('shopPhone').value = '';
        document.getElementById('shopLicense').value = '';
        document.getElementById('shopDesc').value = '';
        
        showToast('申请已提交，等待审核');
        setTimeout(() => {
            showPage('rolePage');
        }, 1500);
    });

    document.getElementById('closeGuide').addEventListener('click', () => {
        document.getElementById('guideModal').style.display = 'none';
        localStorage.setItem('campusGuideShown', 'true');
    });

    document.getElementById('viewAllOrders').addEventListener('click', () => {
        renderAllOrders('全部');
        showPage('ordersPage');
    });

    document.getElementById('backFromOrders').addEventListener('click', () => {
        showPage('profilePage');
    });

    document.querySelectorAll('.order-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.order-tab').forEach(b => {
                b.classList.remove('active', 'bg-red-500', 'text-white');
                b.classList.add('bg-gray-100', 'text-gray-600');
            });
            btn.classList.add('active', 'bg-red-500', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-gray-600');
            renderAllOrders(btn.textContent);
        });
    });
});
