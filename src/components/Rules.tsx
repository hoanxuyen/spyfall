import TextAnimation from "./TextAnimation";

export default function Rules() {
  return (
    <div className="prose-invert">
      <h2>
        <TextAnimation text="Trong số các bạn có một kẻ nằm vùng!" />
      </h2>
      <p>
        Gần đây thông tin tình báo của các bạn đã bị lộ ra, một người trong các
        bạn là điệp viên hai mang. Hắn đã tiết lộ tất cả bí mật trong cuộc họp
        ra ngoài khiến cho tổ chức tổn thất nghiêm trọng.
      </p>
      <p>
        May mắn thay, hắn không biết được địa điểm họp tiếp theo của chúng ta,
        nhiệm vụ của các bạn là tìm ra hắn nhanh nhất có thể!
      </p>
      <h2>Cách chơi:</h2>
      <ol>
        <li>
          Trong trò chơi này, ở vòng đầu tiên mọi người sẽ chuyền tay nhau điện
          thoại / tablet để được thông báo về địa điểm họp tiếp theo, trong đó
          có 1 người ngẫu nhiên sẽ được chọn là điệp viên hai mang.
        </li>
        <li>
          Sau khi tất cả mọi người đã sẵn sàng, đồng hồ sẽ bắt đầu đếm ngược.
          Mỗi người có một lượt chơi, trong đó bạn có quyền hỏi bất kì ai 1 câu
          hỏi đúng sai để xác định xem người đó có biết địa điểm họp hay không,
          ví dụ: "Địa điểm đó là một nơi ở Sài Gòn?"
        </li>
        <li>
          Trò chơi có thể được dừng bất kì lúc nào nếu bạn đã tìm ra ai là điệp
          viên hai mang. Kết thúc thời gian đếm ngược, điệp viên hai mang sẽ
          thắng nếu không ai đoán được danh tính của hắn.
        </li>
      </ol>
    </div>
  );
}
