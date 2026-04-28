const foodData = [
    { id: 1, name: '黄焖鸡米饭', price: 18, category: '快餐', image: '🍗' },
    { id: 2, name: '麻辣香锅', price: 25, category: '快餐', image: '🌶️' },
    { id: 3, name: '芝士焗饭', price: 22, category: '快餐', image: '🍛' },
    { id: 4, name: '珍珠奶茶', price: 12, category: '饮品', image: '🧋' },
    { id: 5, name: '柠檬茶', price: 10, category: '饮品', image: '🍋' },
    { id: 6, name: '草莓蛋糕', price: 18, category: '甜点', image: '🍰' },
    { id: 7, name: '提拉米苏', price: 20, category: '甜点', image: '🍮' },
    { id: 8, name: '炸鸡', price: 28, category: '小吃', image: '🍟' },
    { id: 9, name: '烤肠', price: 6, category: '小吃', image: '🌭' },
    { id: 10, name: '牛肉面', price: 20, category: '快餐', image: '🍜' },
    { id: 11, name: '冰咖啡', price: 15, category: '饮品', image: '☕' },
    { id: 12, name: '蛋挞', price: 8, category: '甜点', image: '🥚' },
];

const mockOrders = [
    { id: 1, foodName: '黄焖鸡米饭', price: 18, address: '男生宿舍3号楼', phone: '138****1234', status: 'waiting' },
    { id: 2, foodName: '麻辣香锅+珍珠奶茶', price: 37, address: '女生宿舍5号楼', phone: '139****5678', status: 'waiting' },
    { id: 3, foodName: '芝士焗饭', price: 22, address: '图书馆', phone: '137****9012', status: 'waiting' },
];

let users = [];
let currentUser = null;
let cart = [];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    if (pageId === 'orderPage' || pageId === 'riderPage' || pageId === 'profilePage') {
        document.getElementById('bottomNav').style.display = 'flex';
        updateNavActive(pageId);
    } else {
        document.getElementById('bottomNav').style.display = 'none';
    }
}

function updateNavActive(pageId) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
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
    showToast('已添加到购物车');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-6 py-3 rounded-xl text-sm z-50';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function renderFoodList(category = '全部') {
    const foodList = document.getElementById('foodList');
    const filtered = category === '全部' ? foodData : foodData.filter(item => item.category === category);
    
    foodList.innerHTML = filtered.map(food => `
        <div class="bg-white rounded-2xl shadow-lg p-4 flex gap-4">
            <div class="text-4xl">${food.image}</div>
            <div class="flex-1">
                <h3 class="font-semibold text-gray-800">${food.name}</h3>
                <p class="text-sm text-gray-500">${food.category}</p>
                <div class="flex items-center justify-between mt-2">
                    <span class="text-red-500 font-bold">¥${food.price}</span>
                    <button onclick="addToCart(${JSON.stringify(food).replace(/"/g, '&quot;')})" class="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm">加入购物车</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderOrderList() {
    const orderList = document.getElementById('orderList');
    const emptyOrder = document.getElementById('emptyOrder');
    
    if (mockOrders.length === 0) {
        orderList.innerHTML = '';
        emptyOrder.style.display = 'block';
        return;
    }
    
    emptyOrder.style.display = 'none';
    orderList.innerHTML = mockOrders.map(order => `
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
            <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span class="material-icons text-xs">phone</span>
                <span>${order.phone}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-red-500 font-bold">¥${order.price}</span>
                <button onclick="acceptOrder(${order.id})" class="bg-blue-500 text-white px-6 py-2 rounded-xl text-sm">
                    接单
                </button>
            </div>
        </div>
    `).join('');
}

function acceptOrder(orderId) {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
        order.status = 'accepted';
        showToast('接单成功！');
        renderOrderList();
    }
}

function updateProfile() {
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userPhone').textContent = currentUser.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadCart();
    loadCurrentUser();
    
    if (currentUser) {
        showPage('rolePage');
    }
    
    updateCartUI();
    renderFoodList();
    renderOrderList();
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
        
        const newUser = { phone, password: pwd, name };
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
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.category-btn').forEach(b => b.classList.add('bg-gray-100', 'text-gray-600'));
            btn.classList.add('active', 'bg-red-500', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-gray-600');
            renderFoodList(btn.textContent);
        });
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = foodData.filter(item => item.name.toLowerCase().includes(keyword));
        const foodList = document.getElementById('foodList');
        
        if (filtered.length === 0) {
            foodList.innerHTML = '<p class="text-center text-gray-400 py-8">暂无匹配商品</p>';
            return;
        }
        
        foodList.innerHTML = filtered.map(food => `
            <div class="bg-white rounded-2xl shadow-lg p-4 flex gap-4">
                <div class="text-4xl">${food.image}</div>
                <div class="flex-1">
                    <h3 class="font-semibold text-gray-800">${food.name}</h3>
                    <p class="text-sm text-gray-500">${food.category}</p>
                    <div class="flex items-center justify-between mt-2">
                        <span class="text-red-500 font-bold">¥${food.price}</span>
                        <button onclick="addToCart(${JSON.stringify(food).replace(/"/g, '&quot;')})" class="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm">加入购物车</button>
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
        showToast('订单提交成功，等待骑手接单');
        cart = [];
        saveCart();
        updateCartUI();
        document.getElementById('cartPanel').style.display = 'none';
    });
});