<template>
  <div class="container">
    <div class="header">
      <div class="left-header">
        <div class="header-title">
          Danh sách nhà cung cấp
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
            Thêm
          </div>
          <div class="add-icon"></div>
        </div>
      </div>
    </div>
      <div class="top-grid-data" v-show="isShowTopGridData">
        <div class="box first">
          <div class="cover-amount">
            <div class="amount">
              0,00
            </div>
            <div class="filter-icon"></div>
          </div>
          <div class="content-text">
            Nợ quá hạn
          </div>
        </div>
        <div class="box second">
          <div class="cover-amount">
            <div class="amount">
              0,00
            </div>
            <div class="filter-icon"></div>
          </div>
          <div class="content-text">
            Tổng nợ phải trả
          </div>
        </div>
        <div class="box third">
          <div class="cover-amount">
            <div class="amount">
              0,00
            </div>
          </div>
          <div class="content-text">
            Đã thanh toán (30 ngày gần đây)
          </div>
        </div>
      </div>
      <div class="option-grid-data">
          <div class="left-option-grid-data">
              <div class="icon-select-all">

              </div>
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
                <InputSearch
                  placeholder="Nhập từ khoá tìm kiếm"
                />
              </div>
              <div class="load-icon"></div>
              <div class="export-icon"></div>
              <div class="setting-icon"></div>
              <div class="collapse-option-grid-data" @click="handleShowTopGridData">
                <div class="collapse-icon" :class="isShowTopGridData ? null : 'collapse-icon-down'"></div>
              </div>
          </div>
          
      </div>
      <div class="cover-table-supplier">
          <table>
          <thead>
              <tr>
                <th></th>
                <th class="th-td-first th-first"><div class="cover-first-last"><input type="checkbox"></div></th>
                <th style="min-width:180px">Mã nhà cung cấp</th>
                <th style="min-width:600px">Tên nhà cung cấp</th>
                <th style="min-width:250px">Địa chỉ</th>
                <th style="min-width:200px">Mã số thuế</th>
                <th style="min-width:200px">Số điện thoại</th>
                <th style="min-width:200px;border-right:none">Số CMND</th>
                <th class="th-td-last"><div class="cover-first-last"><div class="cover-first-last">Chức năng</div></div></th>
                <th class="th-td-white"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="th-td-first"><div class="cover-first-last"><input type="checkbox"></div></td>
                <td style="min-width:180px">Kiều Đức LongKiều Đức LongKiều Đức LongKiều Đức Long</td>
                <td style="min-width:600px">Kiều Đức Long</td>
                <td style="min-width:250px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px">Kiều Đức Long</td>
                <td style="min-width:200px;border-right:none">Kiều Đức Long</td>
                <td class="th-td-last"><div class="cover-first-last">Chức năng</div></td>
                <td class="th-td-white"></td>
                <td></td>
              </tr>
            </tbody>
        </table>
      </div>
      <div class="pagination"></div>
    
  </div>
</template>

<script>
import InputSearch from '../components/share/InputSearch'
export default {
  components:{
    InputSearch
  },
  data(){
    return{
      isShowTopGridData:true
    }
  },
  methods:{
    handleShowTopGridData(){
      this.isShowTopGridData = !this.isShowTopGridData
    }
  },
};
</script>

<style scoped>
@import "../assets/css/views/supplier.css";
@import "../assets/css/components/table.css";
</style>
