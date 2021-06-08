<template>
  <div class="container">
    <!-- <SupplierInfo/> -->
    <div class="header">
      <div class="left-header">
        <div class="header-title">
          Thu chi tiền mặt
        </div>
        <div class="back-box">
          <div class="back-icon"></div>
          <div class="back-text">
            Tất cả danh mục
          </div>
        </div>
      </div>
      <div class="right-header">
        <div class="tutorial-box">
          <div class="tutorial-icon"></div>
          <div class="tutorial-text">
            Hướng dẫn
          </div>
        </div>
        <div class="utility-box white-btn">
          <div class="white-btn-text">
            Tiện ích
          </div>
          <div class="white-btn-icon"></div>
        </div>
        <div class="add-box">
          <div class="add-text">
            Thêm chi tiền
          </div>
          <div class="add-icon"></div>
        </div>
      </div>
    </div>
    <div class="top-grid-data" v-show="isShowTopGridData">
      <div class="box first">
        <div class="cover-amount">
          <div class="amount">
            0
          </div>
        </div>
        <div class="content-text">
          Tổng thu đầu năm đến hiện tại
        </div>
      </div>
      <div class="box second">
        <div class="cover-amount">
          <div class="amount">
            0
          </div>
        </div>
        <div class="content-text">
          Tổng chi đầu năm đến hiện tại
        </div>
      </div>
      <div class="box third">
        <div class="cover-amount">
          <div class="amount">
            0
          </div>
        </div>
        <div class="content-text">
          Tồn quỹ hiện tại
        </div>
      </div>
    </div>
    <div class="option-grid-data">
      <div class="left-option-grid-data">
        <div class="icon-select-all"></div>
        <div class="white-btn excute-all-box">
          <div class="white-btn-text">Thực hiện hàng loạt</div>
          <div class="white-btn-icon"></div>
        </div>
        <div class="white-btn filter-box">
          <div class="white-btn-text">Lọc</div>
          <div class="white-btn-icon"></div>
        </div>
      </div>
      <div class="right-option-grid-data">
        <div class="search-box">
          <InputSearch placeholder="Nhập từ khoá tìm kiếm" />
        </div>
        <div class="load-icon"></div>
        <div class="export-icon"></div>
        <div class="setting-icon"></div>
        <div class="collapse-option-grid-data" @click="handleShowTopGridData">
          <div
            class="collapse-icon"
            :class="isShowTopGridData ? null : 'collapse-icon-down'"
          ></div>
        </div>
      </div>
    </div>
    <div class="cover-table-supplier">
      <table>
        <thead>
          <tr>
            <th></th>
            <th class="th-td-first th-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </th>
            <th style="min-width:150px;padding:0"><div class="display-date">Ngày hạch toán</div></th>
            <th style="min-width:150px;padding:0"><div class="display-date">Ngày chứng từ</div></th>
            <th style="min-width:200px">Số chứng từ</th>
            <th style="min-width:350px">Diễn giải</th>
            <th style="min-width:150px"><div class="display-money">Số tiền</div></th>
            <th style="min-width:150px">Đối tượng</th>
            <th style="min-width:150px">Mã đối tượng</th>
            <th style="min-width:350px;border-right:none">Địa chỉ</th>
            <th class="th-td-last">
              <div class="cover-first-last">
                <div class="cover-first-last">Chức năng</div>
              </div>
            </th>
            <th class="th-td-white"></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:150px;padding:0"><div class="display-date">27/11/2000</div></td>
            <td style="min-width:200px">PC00000</td>
            <td style="min-width:350px">Chi tiền cho nhân viên A</td>
            <td style="min-width:150px"><div class="display-money">1.000.000.000</div></td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:150px">Kiều Đức Long</td>
            <td style="min-width:350px;border-right:none">Kiều Đức Long</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option">Xem</div>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link">
                    <div
                      class="drop-down-icon"
                      @click="activeOption($event)"
                      v-click-outside="removeActiveOption"
                    ></div>
                  </a>
                  <a-menu slot="overlay" class="cover-option">
                    <a-menu-item key="0">
                      <a href="#" class="option">Sửa</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="#" class="option">Xóa</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="#" class="option">Ngưng sử dụng</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>

          <tr class="tr-total-money">
            <td></td>
            <td class="th-td-first total-money">
            </td>
            <td style="min-width:150px;padding:0" class="total-money"><div class="display-date"><b>Tổng</b></div></td>
            <td style="min-width:150px;padding:0" class="total-money"></td>
            <td style="min-width:200px" class="total-money"></td>
            <td style="min-width:350px" class="total-money"></td>
            <td style="min-width:150px" class="total-money"><div class="display-money"><b>1.000.000.000</b></div></td>
            <td style="min-width:150px" class="total-money"></td>
            <td style="min-width:150px" class="total-money"></td>
            <td style="min-width:350px" class="total-money"></td>
            <td class="th-td-last total-money">
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>

        </tbody>
      </table>
    </div>
    <div class="pagination">
      <div class="left-pagination">Tổng số: <b>20</b> bản ghi</div>
      <div class="right-pagination">
        <div class="select-record-number">
          <Combobox
            :dataOptions="dataOptions"
            :fieldDisplay="'DisplayField'"
            :fieldSearch="'DisplayField'"
            :isMultiple="false"
            @setItemSelected="changePageSize"
            :titleOptions="titleOptions"
            :lWidth="225"
          />
        </div>
        <div class="select-page">
          <a-pagination
            size="small"
            showLessItems="true"
            :total="100"
            :pageSize="10"
            :item-render="itemRender"
          />
        </div>
      </div>
    </div>
    <!-- <AccountInfo/> -->
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
// import InputSearch from "../components/share/InputSearch";
import Combobox from "../components/share/Combobox"
// import SupplierInfo from "../components/dialogs/SupplierInfo"
// import AccountInfo from "../components/dialogs/AccountInfo"

export default {
  components: {
    // InputSearch,
    Combobox
    // SupplierInfo
    // AccountInfo
  },
  data() {
    return {
      isShowTopGridData: true,
      dataOptions: [
        {
          DisplayField: "10 bản ghi trên 1 trang",
        },
        {
          DisplayField: "20 bản ghi trên 1 trang",
        },
        {
          DisplayField: "30 bản ghi trên 1 trang",
        },
        {
          DisplayField: "50 bản ghi trên 1 trang",
        },
        {
          DisplayField: "100 bản ghi trên 1 trang",
        },
      ],
      titleOptions: [
        {
          Width: 150,
        },
      ],
    };
  },
  methods: {
    handleShowTopGridData() {
      this.isShowTopGridData = !this.isShowTopGridData;
    },
    itemRender(current, type, originalElement) {
      if (type === "prev") {
        return <a class="btn-prev">Trước</a>;
      } else if (type === "next") {
        return <a class="btn-next">Sau</a>;
      }
      return originalElement;
    },
    changePageSize(index) {
      console.log(index);
    },
    /**
     * Hàm thực hiện thêm class vào mũi tên được click
     * CreatedBy KDLong 02/06/2021
     */
    activeOption(event) {
      event.currentTarget.classList.add("active");
    },
    /**
     * Hàm thực hiện loại bỏ border cho mũi tên khi click ra ngoài
     * CreatedBy KDLong 02/06/2021
     */
    removeActiveOption(event) {
      //Kiểm tra vị trí click xem có phải mũi tên hay không
      if (
        event.target.classList.contains("drop-down-icon") ||
        event.target.classList.contains("cover-drop-down-icon")
      ) {
        //Nếu có phải thì loại bỏ hết các border của các mũi tên khác
        let activeIcon = document.querySelectorAll(".active");
        activeIcon.forEach((activeElement) => {
          activeElement.classList.remove("active");
        });
        //Sau đó border cho mũi tên vừa click
        event.target.classList.add("active");
      } else {
        //Nếu chỗ click ko phải mũi tên thì loại bỏ border cho mũi tên
        let activeIcon = document.querySelectorAll(".active");
        activeIcon.forEach((activeElement) => {
          activeElement.classList.remove("active");
        });
      }
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style scoped>
@import "../assets/css/views/payment.css";
@import "../assets/css/components/table.css";
@import "../assets/css/components/pagination.css";
</style>
