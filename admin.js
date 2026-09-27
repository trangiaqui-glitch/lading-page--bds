/**
 * Vinhomes Grand Park - Admin Management Dashboard (Pure Vanilla JavaScript)
 * Full CRUD capabilities for Real Estate Properties & Consultation Leads
 * Persistence via browser localStorage (No backend required)
 */

// Key constants for localStorage
const STORAGE_KEY_PROPERTIES = 'vgp_admin_properties';
const STORAGE_KEY_LEADS = 'vgp_leads';

// Default sample data for Real Estate
const DEFAULT_PROPERTIES = [
  {
    id: 'VGP-ORI-201',
    code: 'VGP-ORI-201',
    title: 'Căn hộ 2PN The Origami Phong Cách Nhật',
    zone: 'The Origami',
    type: 'Căn hộ cao cấp',
    area: 68.5,
    price: '3.2 tỷ',
    status: 'Còn trống',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    description: 'Căn hộ thiết kế chuẩn phong cách Nhật Bản, hướng nhìn vườn thiền sỏi trắng và hồ cá Koi.'
  },
  {
    id: 'VGP-MAN-018',
    code: 'VGP-MAN-018',
    title: 'Biệt Thự Đơn Lập Ven Sông The Manhattan',
    zone: 'The Manhattan',
    type: 'Biệt thự nghỉ dưỡng',
    area: 350.0,
    price: 'Liên hệ tư vấn',
    status: 'Còn trống',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    description: 'Biệt thự siêu sang ven sông Tắc, hồ bơi riêng, sân vườn rộng đón gió sinh thái mát mẻ.'
  },
  {
    id: 'VGP-BEV-502',
    code: 'VGP-BEV-502',
    title: 'Căn Hộ Suite View Trọn Công Viên The Beverly',
    zone: 'The Beverly',
    type: 'Căn hộ cao cấp',
    area: 105.0,
    price: '5.8 tỷ',
    status: 'Đã giữ chỗ',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    description: 'Phân khu nghỉ dưỡng phong cách Beverly Hills, ban công kính panorama ngắm trọn công viên 36ha.'
  },
  {
    id: 'VGP-SH-102',
    code: 'VGP-SH-102',
    title: 'Shophouse Thương Mại Mặt Tiền Phố Đi Bộ',
    zone: 'The Rainbow',
    type: 'Nhà phố thương mại',
    area: 140.0,
    price: '12.5 tỷ',
    status: 'Còn trống',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    description: 'Nhà phố thương mại 5 tầng, vị trí đắc địa kinh doanh sầm uất ngay trung tâm phân khu The Rainbow.'
  },
  {
    id: 'VGP-GLO-304',
    code: 'VGP-GLO-304',
    title: 'Căn Hộ Studio Luxury Phân Khu Glory Heights',
    zone: 'Glory Heights',
    type: 'Căn hộ cao cấp',
    area: 39.5,
    price: '2.1 tỷ',
    status: 'Đã bán',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    description: 'Căn hộ Studio nhỏ gọn tiện nghi tối ưu, nằm sát cạnh trung tâm thương mại Vincom Mega Mall.'
  }
];

// Fallback image if URL is empty or invalid
const DEFAULT_PROP_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';

// Global state
let properties = [];
let leads = [];
let deleteTargetId = null;

// Bootstrap Modal & Toast Instances
let propertyModalInstance = null;
let deleteModalInstance = null;
let toastInstance = null;

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Bootstrap interactive components
  const propModalEl = document.getElementById('propertyModal');
  if (propModalEl) propertyModalInstance = new bootstrap.Modal(propModalEl);

  const delModalEl = document.getElementById('deleteConfirmModal');
  if (delModalEl) deleteModalInstance = new bootstrap.Modal(delModalEl);

  const toastEl = document.getElementById('adminToast');
  if (toastEl) toastInstance = new bootstrap.Toast(toastEl, { delay: 3500 });

  // Load data
  initPropertiesData();
  initLeadsData();

  // Attach Event Listeners
  setupEventListeners();

  // Initial Render
  renderProperties();
  renderLeads();
  updateStats();
});

/**
 * Initialize Properties from localStorage or Default
 */
function initPropertiesData() {
  const stored = localStorage.getItem(STORAGE_KEY_PROPERTIES);
  if (stored) {
    try {
      properties = JSON.parse(stored);
    } catch (e) {
      console.error('Lỗi khi đọc dữ liệu bất động sản từ localStorage:', e);
      properties = [...DEFAULT_PROPERTIES];
      saveProperties();
    }
  } else {
    properties = [...DEFAULT_PROPERTIES];
    saveProperties();
  }
}

/**
 * Initialize Leads from localStorage
 */
function initLeadsData() {
  const stored = localStorage.getItem(STORAGE_KEY_LEADS);
  if (stored) {
    try {
      leads = JSON.parse(stored);
    } catch (e) {
      leads = [];
    }
  } else {
    leads = [
      {
        id: 'LEAD-1',
        fullName: 'Nguyễn Văn Minh',
        phone: '0903123456',
        interest: 'Biệt thự nghỉ dưỡng sinh thái',
        createdAt: '27/09/2026 10:15',
        status: 'Mới'
      },
      {
        id: 'LEAD-2',
        fullName: 'Trần Thị Thu Hà',
        phone: '0988765432',
        interest: 'Căn hộ 2PN The Origami',
        createdAt: '27/09/2026 14:30',
        status: 'Đang tư vấn'
      }
    ];
    saveLeads();
  }
}

function saveProperties() {
  localStorage.setItem(STORAGE_KEY_PROPERTIES, JSON.stringify(properties));
}

function saveLeads() {
  localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
}

/**
 * Event Listeners setup
 */
function setupEventListeners() {
  // Open Add Property Modal
  document.getElementById('btnOpenAddModal')?.addEventListener('click', openAddPropertyModal);

  // Property Form Submit (Add or Edit)
  document.getElementById('propertyForm')?.addEventListener('submit', handlePropertyFormSubmit);

  // Confirm Delete Property
  document.getElementById('btnConfirmDelete')?.addEventListener('click', confirmDeleteProperty);

  // Reset to default data
  document.getElementById('btnResetDefaultData')?.addEventListener('click', () => {
    if (confirm('Bạn có muốn khôi phục danh mục bất động sản về danh sách mẫu mặc định không?')) {
      properties = JSON.parse(JSON.stringify(DEFAULT_PROPERTIES));
      saveProperties();
      renderProperties();
      updateStats();
      showToast('Đã khôi phục dữ liệu mẫu bất động sản thành công!', 'success');
    }
  });

  // Filter & Search Properties
  document.getElementById('searchPropertyInput')?.addEventListener('input', renderProperties);
  document.getElementById('filterZoneSelect')?.addEventListener('change', renderProperties);
  document.getElementById('filterStatusSelect')?.addEventListener('change', renderProperties);
  document.getElementById('btnClearFilters')?.addEventListener('click', () => {
    document.getElementById('searchPropertyInput').value = '';
    document.getElementById('filterZoneSelect').value = '';
    document.getElementById('filterStatusSelect').value = '';
    renderProperties();
  });

  // Filter & Search Leads
  document.getElementById('searchLeadInput')?.addEventListener('input', renderLeads);
  document.getElementById('btnClearAllLeads')?.addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách khách hàng liên hệ?')) {
      leads = [];
      saveLeads();
      renderLeads();
      updateStats();
      showToast('Đã xóa tất cả khách hàng!', 'info');
    }
  });

  // Add Sample Lead
  document.getElementById('btnAddSampleLead')?.addEventListener('click', () => {
    const randomId = 'LEAD-' + Math.floor(Math.random() * 9000 + 1000);
    const newLead = {
      id: randomId,
      fullName: 'Khách hàng mẫu #' + Math.floor(Math.random() * 100 + 1),
      phone: '09' + Math.floor(10000000 + Math.random() * 90000000),
      interest: 'Biệt thự nghỉ dưỡng sinh thái',
      createdAt: new Date().toLocaleString('vi-VN'),
      status: 'Mới'
    };
    leads.unshift(newLead);
    saveLeads();
    renderLeads();
    updateStats();
    showToast('Đã thêm khách hàng mẫu thành công!', 'success');
  });
}

/**
 * Render Properties Table with Filtering & Searching
 */
function renderProperties() {
  const tbody = document.getElementById('propertyTableBody');
  const emptyState = document.getElementById('propertyEmptyState');
  if (!tbody) return;

  const searchQuery = (document.getElementById('searchPropertyInput')?.value || '').trim().toLowerCase();
  const zoneFilter = document.getElementById('filterZoneSelect')?.value || '';
  const statusFilter = document.getElementById('filterStatusSelect')?.value || '';

  const filtered = properties.filter(prop => {
    const matchesSearch = !searchQuery || 
      prop.title.toLowerCase().includes(searchQuery) || 
      prop.code.toLowerCase().includes(searchQuery) ||
      (prop.description && prop.description.toLowerCase().includes(searchQuery));
    const matchesZone = !zoneFilter || prop.zone === zoneFilter;
    const matchesStatus = !statusFilter || prop.status === statusFilter;
    return matchesSearch && matchesZone && matchesStatus;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    emptyState?.classList.remove('d-none');
    return;
  }

  emptyState?.classList.add('d-none');
  tbody.innerHTML = filtered.map(prop => {
    const statusBadgeClass = getStatusBadgeClass(prop.status);
    const imageUrl = prop.image || DEFAULT_PROP_IMAGE;

    return `
      <tr>
        <td>
          <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(prop.title)}" class="property-thumb" onerror="this.src='${DEFAULT_PROP_IMAGE}'">
        </td>
        <td>
          <span class="badge bg-light text-primary border fw-bold">${escapeHtml(prop.code)}</span>
        </td>
        <td>
          <strong class="d-block text-dark">${escapeHtml(prop.title)}</strong>
          <small class="text-muted text-truncate d-inline-block" style="max-width: 250px;">${escapeHtml(prop.description || '')}</small>
        </td>
        <td>
          <span class="fw-semibold text-secondary">${escapeHtml(prop.zone)}</span>
        </td>
        <td>${escapeHtml(prop.type)}</td>
        <td><span class="fw-bold">${prop.area}</span> m²</td>
        <td><strong class="text-primary">${escapeHtml(prop.price)}</strong></td>
        <td>
          <span class="badge ${statusBadgeClass} px-2 py-1">${escapeHtml(prop.status)}</span>
        </td>
        <td class="text-center">
          <div class="action-btn-group d-flex justify-content-center gap-1">
            <button class="btn btn-outline-primary" onclick="openEditPropertyModal('${prop.id}')" title="Chỉnh sửa bất động sản">
              <i class="bi bi-pencil-square"></i> Sửa
            </button>
            <button class="btn btn-outline-danger" onclick="openDeleteModal('${prop.id}')" title="Xóa bất động sản">
              <i class="bi bi-trash3"></i> Xóa
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Return CSS Badge Class based on property status
 */
function getStatusBadgeClass(status) {
  switch (status) {
    case 'Còn trống':
      return 'badge-status-available';
    case 'Đã giữ chỗ':
      return 'badge-status-reserved';
    case 'Đã bán':
      return 'badge-status-sold';
    default:
      return 'bg-secondary text-white';
  }
}

/**
 * Open Modal in "Add" Mode
 */
function openAddPropertyModal() {
  const form = document.getElementById('propertyForm');
  if (!form) return;
  form.reset();
  form.classList.remove('was-validated');

  document.getElementById('propertyFormMode').value = 'add';
  document.getElementById('propertyIdOriginal').value = '';
  document.getElementById('propertyModalTitle').innerHTML = '<i class="bi bi-plus-circle me-1"></i>Thêm Bất Động Sản Mới';
  document.getElementById('btnSubmitPropertyForm').innerHTML = '<i class="bi bi-save me-1"></i>Thêm mới';

  // Suggest a random code
  document.getElementById('propCode').value = 'VGP-' + Math.floor(Math.random() * 899 + 100);

  propertyModalInstance?.show();
}

/**
 * Open Modal in "Edit" Mode
 */
window.openEditPropertyModal = function(id) {
  const prop = properties.find(p => p.id === id);
  if (!prop) return;

  const form = document.getElementById('propertyForm');
  if (!form) return;
  form.classList.remove('was-validated');

  document.getElementById('propertyFormMode').value = 'edit';
  document.getElementById('propertyIdOriginal').value = prop.id;
  document.getElementById('propertyModalTitle').innerHTML = '<i class="bi bi-pencil-square me-1"></i>Chỉnh Sửa Bất Động Sản';
  document.getElementById('btnSubmitPropertyForm').innerHTML = '<i class="bi bi-check-circle me-1"></i>Cập nhật';

  document.getElementById('propCode').value = prop.code || '';
  document.getElementById('propTitle').value = prop.title || '';
  document.getElementById('propZone').value = prop.zone || '';
  document.getElementById('propType').value = prop.type || 'Căn hộ cao cấp';
  document.getElementById('propArea').value = prop.area || '';
  document.getElementById('propPrice').value = prop.price || '';
  document.getElementById('propStatus').value = prop.status || 'Còn trống';
  document.getElementById('propImage').value = prop.image || '';
  document.getElementById('propDesc').value = prop.description || '';

  propertyModalInstance?.show();
};

/**
 * Handle Property Form Submission (Create or Update)
 */
function handlePropertyFormSubmit(e) {
  e.preventDefault();
  const form = e.target;

  if (!form.checkValidity()) {
    e.stopPropagation();
    form.classList.add('was-validated');
    return;
  }

  const mode = document.getElementById('propertyFormMode').value;
  const originalId = document.getElementById('propertyIdOriginal').value;

  const code = document.getElementById('propCode').value.trim();
  const title = document.getElementById('propTitle').value.trim();
  const zone = document.getElementById('propZone').value;
  const type = document.getElementById('propType').value;
  const area = parseFloat(document.getElementById('propArea').value) || 0;
  const price = document.getElementById('propPrice').value.trim();
  const status = document.getElementById('propStatus').value;
  const image = document.getElementById('propImage').value.trim() || DEFAULT_PROP_IMAGE;
  const description = document.getElementById('propDesc').value.trim();

  if (mode === 'add') {
    // Check if code already exists
    if (properties.some(p => p.code.toLowerCase() === code.toLowerCase())) {
      alert(`Mã bất động sản "${code}" đã tồn tại! Vui lòng chọn mã khác.`);
      document.getElementById('propCode').focus();
      return;
    }

    const newProperty = {
      id: 'PROP_' + Date.now(),
      code,
      title,
      zone,
      type,
      area,
      price,
      status,
      image,
      description
    };

    properties.unshift(newProperty);
    saveProperties();
    showToast(`Đã thêm bất động sản "${title}" thành công!`, 'success');
  } else {
    // Edit mode
    const index = properties.findIndex(p => p.id === originalId);
    if (index !== -1) {
      // Check code uniqueness against other records
      if (properties.some((p, i) => i !== index && p.code.toLowerCase() === code.toLowerCase())) {
        alert(`Mã bất động sản "${code}" đã tồn tại trên một sản phẩm khác!`);
        document.getElementById('propCode').focus();
        return;
      }

      properties[index] = {
        ...properties[index],
        code,
        title,
        zone,
        type,
        area,
        price,
        status,
        image,
        description
      };

      saveProperties();
      showToast(`Đã cập nhật bất động sản "${title}" thành công!`, 'success');
    }
  }

  propertyModalInstance?.hide();
  renderProperties();
  updateStats();
}

/**
 * Open Confirmation Modal for Deletion
 */
window.openDeleteModal = function(id) {
  const prop = properties.find(p => p.id === id);
  if (!prop) return;

  deleteTargetId = id;
  document.getElementById('deleteTargetTitle').textContent = prop.title;
  document.getElementById('deleteTargetCode').textContent = prop.code;
  deleteModalInstance?.show();
};

/**
 * Confirm and execute deletion
 */
function confirmDeleteProperty() {
  if (!deleteTargetId) return;

  const target = properties.find(p => p.id === deleteTargetId);
  const title = target ? target.title : 'Bất động sản';

  properties = properties.filter(p => p.id !== deleteTargetId);
  saveProperties();

  deleteModalInstance?.hide();
  deleteTargetId = null;

  renderProperties();
  updateStats();
  showToast(`Đã xóa "${title}" thành công!`, 'info');
}

/**
 * Render Leads Table
 */
function renderLeads() {
  const tbody = document.getElementById('leadsTableBody');
  const emptyState = document.getElementById('leadsEmptyState');
  if (!tbody) return;

  const searchQuery = (document.getElementById('searchLeadInput')?.value || '').trim().toLowerCase();

  const filtered = leads.filter(lead => {
    return !searchQuery || 
      lead.fullName.toLowerCase().includes(searchQuery) ||
      lead.phone.includes(searchQuery) ||
      (lead.interest && lead.interest.toLowerCase().includes(searchQuery));
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    emptyState?.classList.remove('d-none');
    return;
  }

  emptyState?.classList.add('d-none');
  tbody.innerHTML = filtered.map((lead, idx) => {
    return `
      <tr>
        <td class="text-muted">${idx + 1}</td>
        <td><strong class="text-dark">${escapeHtml(lead.fullName)}</strong></td>
        <td><a href="tel:${escapeHtml(lead.phone)}" class="text-decoration-none fw-semibold">${escapeHtml(lead.phone)}</a></td>
        <td><span class="badge bg-light text-primary border">${escapeHtml(lead.interest)}</span></td>
        <td><small class="text-muted">${escapeHtml(lead.createdAt || 'Mới đây')}</small></td>
        <td>
          <select class="form-select form-select-sm" style="width: 130px;" onchange="updateLeadStatus('${lead.id}', this.value)">
            <option value="Mới" ${lead.status === 'Mới' ? 'selected' : ''}>Mới</option>
            <option value="Đang tư vấn" ${lead.status === 'Đang tư vấn' ? 'selected' : ''}>Đang tư vấn</option>
            <option value="Đã chốt" ${lead.status === 'Đã chốt' ? 'selected' : ''}>Đã chốt</option>
            <option value="Hủy" ${lead.status === 'Hủy' ? 'selected' : ''}>Hủy</option>
          </select>
        </td>
        <td class="text-center">
          <button class="btn btn-outline-danger btn-sm" onclick="deleteLead('${lead.id}')" title="Xóa liên hệ">
            <i class="bi bi-trash3"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Update Lead Status
 */
window.updateLeadStatus = function(leadId, newStatus) {
  const lead = leads.find(l => l.id === leadId);
  if (lead) {
    lead.status = newStatus;
    saveLeads();
    showToast(`Đã cập nhật trạng thái của "${lead.fullName}" thành: ${newStatus}`, 'success');
  }
};

/**
 * Delete a Single Lead
 */
window.deleteLead = function(leadId) {
  if (confirm('Bạn có chắc muốn xóa khách hàng này không?')) {
    leads = leads.filter(l => l.id !== leadId);
    saveLeads();
    renderLeads();
    updateStats();
    showToast('Đã xóa thông tin khách hàng!', 'info');
  }
};

/**
 * Update All Counter Badges & Stat Cards
 */
function updateStats() {
  const total = properties.length;
  const available = properties.filter(p => p.status === 'Còn trống').length;
  const reserved = properties.filter(p => p.status === 'Đã giữ chỗ').length;
  const totalLeads = leads.length;

  document.getElementById('statTotalProperties').textContent = total;
  document.getElementById('statAvailableProperties').textContent = available;
  document.getElementById('statReservedProperties').textContent = reserved;
  document.getElementById('statTotalLeads').textContent = totalLeads;

  document.getElementById('badgePropertyCount').textContent = total;
  document.getElementById('badgeLeadsCount').textContent = totalLeads;
}

/**
 * Toast Notification Helper
 */
function showToast(message, type = 'success') {
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');

  if (toastMessage) toastMessage.textContent = message;

  if (toastIcon) {
    if (type === 'success') {
      toastIcon.className = 'bi bi-check-circle-fill text-success fs-5';
    } else if (type === 'danger') {
      toastIcon.className = 'bi bi-x-circle-fill text-danger fs-5';
    } else {
      toastIcon.className = 'bi bi-info-circle-fill text-info fs-5';
    }
  }

  toastInstance?.show();
}

/**
 * XSS Security Helper
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return str || '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
