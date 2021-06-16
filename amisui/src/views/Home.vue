<template>
  <div class="home-container">
    <div class="home-header">
      <div class="home-item-active">
        Quy trình
      </div>
      <div class="home-item">
        Thu, chi tiền
      </div>
    </div>
    <div class="home-content">
      <div class="home-content-child">
        <div class="home-cash">
          <div class="home-top-cash">
            <div class="home-title">NGHIỆP VỤ TIỀN MẶT</div>
            <div class="home-cover-picture">
              <div class="home-picture">
                <div class="home-cover-line-cash">
                  <div class="home-cash1 cover-item-cash"></div>
                </div>
                <div class="home-cover-line-cash">
                  
                  <div class="home-cash2 cover-item-cash">
                                    </div>
                </div>
                <div class="home-cover-line-cash">
                    <a-dropdown>
                    <a
                      class="home-ant-dropdown-link"
                      @click="(e) => e.preventDefault()"
                    >
                      <div class="home-cash3 cover-item-cash">
                                    </div>
                    </a>
                    <a-menu slot="overlay" class="home-cover-option-dropdown">
                      <a-menu-item >
                        <router-link to="/payment/paymentinfo" class="home-option-dropdown">Phiếu chi</router-link>
                      </a-menu-item>
                      <a-menu-item >
                        <a href="#" class="home-option-dropdown">Trả tiền theo hoá đơn</a>
                      </a-menu-item>
                      <a-menu-item >
                        <a href="#" class="home-option-dropdown">Nộp thuế</a>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                  <!-- <div class="home-cash3 cover-item-cash"></div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="home-bottom-cash">
            <router-link class="home-item-bottom-cash" to="/supplier">
              <div class="home-cover-icon-home">
                <div class="home-icon-supplier"></div>
              </div>
              <div style="font-size:13px;color:#111111">Nhà cung cấp</div>
            </router-link>
            <router-link class="home-item-bottom-cash" to="/account">
              <div class="home-cover-icon-home">
                <div class="home-icon-account"></div>
              </div>
              <div style="font-size:13px;color:#111111">Hệ thống tài khoản</div>
            </router-link>
            <router-link class="home-item-bottom-cash" to="/payment">
              <div class="home-cover-icon-home">
                <div class="home-icon-payment"></div>
              </div>
              <div style="font-size:13px;color:#111111">Thu chi tiền mặt</div>
            </router-link>
          </div>
        </div>
        <div class="home-report">
          <div class="home-title">BÁO CÁO</div>
          <div class="home-report-content">
            <ul>
              <li>
                Bảng kê số dư tiền theo ngày
              </li>
              <li>
                Sổ kế toán chi tiết quỹ tiền mặt
              </li>
              <li>
                S03a2-DN: Sổ nhật ký chi tiền
              </li>
              <li>
                S03a1-DN: Sổ nhật ký thu tiền
              </li>
            </ul>
          </div>
          <div class="home-report-footer">
            Tất cả báo cáo
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="test">
            
        </div> -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import "../assets/css/views/home.css";
</style>
