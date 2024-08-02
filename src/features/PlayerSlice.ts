import { createSlice } from "@reduxjs/toolkit";
import { IMAGES } from "../components/ImagePath";
export enum LocationSource {
  DEFAULT = "DEFAULT",
  COMBINE = "COMBINE",
  CUSTOM = "CUSTOM",
}
export type LocationsType = {
  name: string;
  description: string;
  image: string;
};
type PlayerStateType = {
  value: number;
  spyIndex: null | number;
  location: null | string;
  currentPlayerIndex: number;
  ready: boolean;
  locations: LocationsType[];
  customLocations: string[];
  locationsOption: LocationSource;
};

const initialNonCustomState = {
  spyIndex: null,
  location: null,
  currentPlayerIndex: 0,
  ready: false,
  locationsOption: LocationSource.DEFAULT,
};

const initialState: PlayerStateType = {
  ...initialNonCustomState,
  value: 4,
  locations: [
    {
      name: "Vòng xoay Lăng Cha Cả",
      description:
        "Một trong những nút giao thông quan trọng nhất tại quận Tân Bình, TP.HCM. Vòng xoay này kết nối các trục đường lớn như Cộng Hòa, Hoàng Văn Thụ và Trường Chinh, giúp điều tiết giao thông trong khu vực đông đúc này.",
      image: IMAGES.LangChaCaImage,
    },
    {
      name: "Maximark Cộng Hoà",
      description:
        "Một trong những siêu thị và trung tâm thương mại lớn tại đường Cộng Hòa, quận Tân Bình. Đây là nơi cung cấp đa dạng các mặt hàng từ thực phẩm, đồ gia dụng đến thời trang và giải trí, phục vụ nhu cầu mua sắm của người dân trong khu vực.",
      image: IMAGES.MaximarkImage,
    },
    {
      name: "Hồ Con Rùa",
      description:
        "Một hồ nước nhỏ nằm ở quận 3, TP.HCM, nổi tiếng với kiến trúc độc đáo và không gian thoáng đãng. Hồ Con Rùa là địa điểm lý tưởng cho các buổi hẹn hò, gặp gỡ bạn bè và là nơi diễn ra nhiều hoạt động văn hóa, giải trí.",
      image: IMAGES.HoConRuaImage,
    },
    {
      name: "Nhà thờ Đức Bà",
      description:
        "Nhà thờ chính tòa của Tổng giáo phận TP.HCM, được xây dựng từ thời Pháp thuộc vào cuối thế kỷ 19. Nhà thờ Đức Bà nổi bật với kiến trúc Romanesque và Gothic, hai tháp chuông cao 58 mét và những bức tường gạch đỏ đặc trưng.",
      image: IMAGES.NhaThoDucBaImage,
    },
    {
      name: "Bưu điện Trung tâm Sài Gòn",
      description:
        "Tòa nhà bưu điện cổ kính nằm ở trung tâm TP.HCM, được xây dựng từ năm 1886 đến 1891 theo thiết kế của kiến trúc sư Gustave Eiffel. Kiến trúc của bưu điện là sự kết hợp hài hòa giữa phong cách Á - Âu, với nội thất trang trí tinh xảo và mái vòm cao rộng.",
      image: IMAGES.BuuDienImage,
    },
    {
      name: "Chợ Bến Thành",
      description:
        "Chợ nổi tiếng nhất TP.HCM, được xây dựng vào năm 1912. Chợ Bến Thành là điểm đến mua sắm quen thuộc của người dân và du khách, với hàng ngàn gian hàng bán đủ các loại hàng hóa từ quần áo, giày dép, thực phẩm đến quà lưu niệm.",
      image: IMAGES.ChoBenThanhImage,
    },
    {
      name: "Dinh Độc Lập",
      description:
        "Tòa nhà lịch sử nơi diễn ra sự kiện thống nhất đất nước vào ngày 30 tháng 4 năm 1975. Dinh Độc Lập, còn gọi là Dinh Thống Nhất, được xây dựng từ năm 1868 và hoàn thành vào năm 1871, mang đậm dấu ấn của kiến trúc hiện đại và cổ kính.",
      image: IMAGES.DinhDocLapImage,
    },
    {
      name: "Phố đi bộ Nguyễn Huệ",
      description:
        "Con đường đi bộ nổi tiếng ở trung tâm quận 1, TP.HCM, dài khoảng 670 mét. Phố đi bộ Nguyễn Huệ là nơi diễn ra nhiều sự kiện lớn như Lễ hội ánh sáng, các buổi biểu diễn nghệ thuật và là điểm hẹn hò lý tưởng của người dân và du khách.",
      image: IMAGES.PhoDiBoNHImage,
    },
    {
      name: "Cầu Ánh Sao",
      description:
        "Cây cầu dành cho người đi bộ với hệ thống chiếu sáng LED đẹp mắt, nằm ở khu đô thị Phú Mỹ Hưng, quận 7. Cầu Ánh Sao bắc qua hồ Bán Nguyệt và là địa điểm lãng mạn cho các cặp đôi, nơi người ta có thể thưởng thức khung cảnh tuyệt đẹp về đêm.",
      image: IMAGES.CauAnhSaoImage,
    },
    {
      name: "Công viên 23/9",
      description:
        "Công viên lớn nằm gần chợ Bến Thành, là nơi tổ chức nhiều hoạt động văn hóa, giải trí và thể thao. Công viên 23/9 có diện tích rộng lớn, với nhiều cây xanh, lối đi bộ và khu vực vui chơi dành cho trẻ em.",
      image: IMAGES.CongVien239Image,
    },
    {
      name: "Thảo Cầm Viên",
      description:
        "Vườn thú lâu đời và lớn nhất ở TP.HCM, được thành lập từ năm 1864. Thảo Cầm Viên là nơi bảo tồn và chăm sóc nhiều loài động thực vật quý hiếm, đồng thời cũng là điểm đến giáo dục và giải trí hấp dẫn cho các gia đình và du khách.",
      image: IMAGES.ThaoCamVienImage,
    },
    {
      name: "Cầu Sài Gòn",
      description:
        "Cây cầu nối liền quận 2 và quận Bình Thạnh, TP.HCM. Cầu Sài Gòn được xây dựng từ năm 1959 đến 1961, là một trong những cây cầu quan trọng giúp kết nối các khu vực phía đông với trung tâm thành phố.",
      image: IMAGES.CauSaiGonImage,
    },
    {
      name: "Cầu Phú Mỹ",
      description:
        "Cây cầu dây văng lớn nhất ở TP.HCM, nối liền quận 2 và quận 7. Cầu Phú Mỹ được khánh thành vào năm 2009, với thiết kế hiện đại và kiến trúc ấn tượng, giúp giảm tải giao thông cho các tuyến đường xung quanh.",
      image: IMAGES.CauPhuMyImage,
    },
    {
      name: "Bến Bạch Đằng",
      description:
        "Khu vực bến tàu du lịch nằm bên sông Sài Gòn, là điểm ngắm cảnh và tham quan hấp dẫn. Bến Bạch Đằng có không gian thoáng đãng, là nơi lý tưởng để đi dạo, ngắm cảnh hoàng hôn và tham gia các tour du lịch bằng thuyền trên sông.",
      image: IMAGES.BenBachDangImage,
    },
    {
      name: "Chợ Lớn",
      description:
        "Khu vực buôn bán sầm uất của người Hoa tại quận 5, TP.HCM. Chợ Lớn không chỉ là trung tâm thương mại lớn mà còn là nơi lưu giữ nhiều giá trị văn hóa, lịch sử của cộng đồng người Hoa ở Sài Gòn.",
      image: IMAGES.ChoLonImage,
    },
    {
      name: "Chùa Vĩnh Nghiêm",
      description:
        "Một trong những ngôi chùa lớn và nổi tiếng ở TP.HCM, nằm ở quận 3. Chùa Vĩnh Nghiêm được xây dựng từ năm 1964 đến 1971, mang đậm phong cách kiến trúc truyền thống của Phật giáo Việt Nam.",
      image: IMAGES.ChuaVinhNghiemImage,
    },
    {
      name: "Bitexco Financial Tower",
      description:
        "Tòa nhà cao ốc hiện đại với chiều cao 262 mét, nằm ở trung tâm quận 1, TP.HCM. Bitexco Financial Tower là biểu tượng của sự phát triển kinh tế và kiến trúc hiện đại của thành phố.",
      image: IMAGES.BitexcoImage,
    },
    {
      name: "Bảo tàng Chứng tích Chiến tranh",
      description:
        "Bảo tàng trưng bày nhiều hiện vật, hình ảnh và tài liệu liên quan đến cuộc chiến tranh Việt Nam. Bảo tàng là nơi giúp người xem hiểu rõ hơn về lịch sử và hậu quả của chiến tranh đối với đất nước và con người Việt Nam.",
      image: IMAGES.BaoTangChienTranhImage,
    },
    {
      name: "Công viên Tao Đàn",
      description:
        "Một trong những công viên lớn và đẹp nhất TP.HCM, nằm ở quận 1. Công viên Tao Đàn có không gian xanh mát, là nơi lý tưởng để tập thể dục, thư giãn và tổ chức các hoạt động ngoài trời.",
      image: IMAGES.TaoDanImage,
    },
    {
      name: "Bến Nhà Rồng",
      description:
        "Nơi Bác Hồ ra đi tìm đường cứu nước vào năm 1911. Bến Nhà Rồng nằm ở quận 4, TP.HCM, là di tích lịch sử quan trọng và là điểm đến du lịch hấp dẫn.",
      image: IMAGES.BenNhaRongImage,
    },
    {
      name: "Nhà hát Thành phố",
      description:
        "Nhà hát lớn và đẹp nhất TP.HCM, nằm ở trung tâm quận 1. Nhà hát Thành phố là nơi diễn ra nhiều chương trình nghệ thuật, biểu diễn nhạc kịch, opera và các sự kiện văn hóa quan trọng.",
      image: IMAGES.NhaHatImage,
    },
    {
      name: "Công viên Văn hóa Đầm Sen",
      description:
        "Khu vui chơi giải trí lớn tại quận 11, TP.HCM. Công viên Văn hóa Đầm Sen có nhiều trò chơi thú vị, khu vực tham quan và không gian xanh mát, là điểm đến lý tưởng cho các gia đình và du khách.",
      image: IMAGES.DamSenImage,
    },
    {
      name: "Khu du lịch Suối Tiên",
      description:
        "Khu du lịch nổi tiếng với các công trình kiến trúc, giải trí và cảnh quan đẹp mắt. Suối Tiên nằm ở quận 9, TP.HCM, là điểm đến hấp dẫn cho những ai yêu thích khám phá và trải nghiệm.",
      image: IMAGES.SuoiTienImage,
    },
    {
      name: "Đường sách Nguyễn Văn Bình",
      description:
        "Con đường dành riêng cho sách và văn hóa đọc, nằm ở trung tâm quận 1, TP.HCM. Đường sách Nguyễn Văn Bình là nơi tổ chức nhiều sự kiện, hoạt động liên quan đến sách và là điểm đến lý tưởng cho những ai yêu thích sách.",
      image: IMAGES.DuongSachImage,
    },
    {
      name: "Công viên Hoàng Văn Thụ",
      description:
        "Công viên lớn nằm ở quận Tân Bình, TP.HCM. Công viên Hoàng Văn Thụ có không gian xanh mát, là nơi lý tưởng để tập thể dục, thư giãn và tổ chức các hoạt động ngoài trời.",
      image: IMAGES.CongVienHVTImage,
    },
    {
      name: "Khu phố Tây Bùi Viện",
      description:
        "Khu phố sầm uất và náo nhiệt nhất ở quận 1, TP.HCM, với nhiều quán bar, nhà hàng và các hoạt động giải trí về đêm. Khu phố Tây Bùi Viện là điểm đến hấp dẫn cho những ai muốn trải nghiệm không khí sôi động của thành phố.",
      image: IMAGES.BuiVienImage,
    },
    {
      name: "Chùa Giác Lâm",
      description:
        "Ngôi chùa cổ nhất TP.HCM, được xây dựng từ năm 1744. Chùa Giác Lâm nằm ở quận Tân Bình, là nơi có kiến trúc độc đáo và lịch sử phong phú.",
      image: IMAGES.ChuaGiacLamImage,
    },
    {
      name: "Chợ An Đông",
      description:
        "Một trong những chợ lớn và nổi tiếng ở quận 5, TP.HCM. Chợ An Đông chuyên bán buôn và bán lẻ các mặt hàng quần áo, giày dép và đồ gia dụng.",
      image: IMAGES.ChoAnDongImage,
    },
    {
      name: "Đại học Quốc gia TP.HCM",
      description:
        "Khuôn viên đại học lớn nhất và hiện đại nhất ở TP.HCM, nằm ở quận Thủ Đức. Đại học Quốc gia TP.HCM là trung tâm giáo dục và nghiên cứu hàng đầu của cả nước.",
      image: IMAGES.DaiHocQuocGiaImage,
    },
    {
      name: "Công viên Lê Thị Riêng",
      description:
        "Công viên lớn nằm ở quận 10, TP.HCM, với nhiều cây xanh, khu vực vui chơi và thể dục thể thao. Công viên Lê Thị Riêng là nơi lý tưởng để thư giãn và tận hưởng không gian xanh mát.",
      image: IMAGES.CongVienLTRImage,
    },
  ],
  customLocations: [],
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setInitialPlayer: (state, action) => {
      state.value = action.payload;
    },
    assignSpy: (state, action) => {
      state.spyIndex = Math.floor(Math.random() * action.payload);
    },
    nextPlayer: (state) => {
      if (state.value !== null && state.currentPlayerIndex < state.value - 1) {
        state.currentPlayerIndex += 1;
        state.ready = false;
      }
    },
    setReady: (state, action) => {
      state.ready = action.payload;
    },
    resetPlayers: (state) => {
      return {
        ...initialNonCustomState,
        customLocations: state.customLocations,
        locations: state.locations,
        value: state.value,
      };
    },
    resetAllPlayers: () => {
      return initialState;
    },
    updateLocations: (state, action) => {
      state.locations = action.payload;
    },
    updateCustomLocations: (state, action) => {
      state.customLocations = action.payload;
    },
    removeLocation: (state, action) => {
      const { locationSource, index } = action.payload;
      switch (locationSource) {
        case LocationSource.DEFAULT:
          {
            const newLocations = [
              ...state.locations.slice(0, index),
              ...state.locations.slice(index + 1),
            ];
            state.locations = newLocations;
          }
          break;
        case LocationSource.CUSTOM: {
          const newCustomLocations = [
            ...state.customLocations.slice(0, index),
            ...state.customLocations.slice(index + 1),
          ];
          state.customLocations = newCustomLocations;
        }
      }
    },
    showOption: (state, action) => {
      state.locationsOption = action.payload;
    },
    assignLocation: (state) => {
      switch (state.locationsOption) {
        case LocationSource.DEFAULT:
          state.location =
            state.locations[
              Math.floor(Math.random() * state.locations.length)
            ].name;
          break;
        case LocationSource.COMBINE: {
          const allLocation = [
            ...state.locations.map((location) => location.name),
            ...state.customLocations,
          ];
          state.location =
            allLocation[Math.floor(Math.random() * allLocation.length)];
          break;
        }
        case LocationSource.CUSTOM:
          state.location =
            state.customLocations[
              Math.floor(Math.random() * state.customLocations.length)
            ];
          break;
      }
    },
  },
});

export const {
  setInitialPlayer,
  assignSpy,
  assignLocation,
  nextPlayer,
  setReady,
  resetPlayers,
  resetAllPlayers,
  updateLocations,
  updateCustomLocations,
  showOption,
  removeLocation,
} = playerSlice.actions;

export default playerSlice.reducer;
