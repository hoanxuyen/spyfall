import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function TextAnimation({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const count = useMotionValue(0); // sẽ chạy từ 0 đến text.lenght vì sử dụng library nên số này được update liên tục
  const rounded = useTransform(count, (latest) => Math.round(latest)); // làm tròn số count để có được số index của ký tự trên chuỗi string text
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest)); // return kết quả slice của text , khi đến text.lenght thì là hết animation count
  useEffect(() => {
    // Khi vừa mount component sẽ initiates animation vì sử dụng animation(from,to,options)
    const controls = animate(count, text.length, {
      duration: 2,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);
  return <motion.span className={className}>{displayText}</motion.span>;
}
