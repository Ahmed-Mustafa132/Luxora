import { useInView } from "react-intersection-observer";

export default function FadeInWhenVisible({
  children,
  direction = "up",
  threshold = 0.15,
  once = true,
  duration = 700, // ms
  delay = 0, // ms
  className = "",
  ...props
}) {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
  });

  // إعداد التحريك حسب الاتجاه
  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(32px)";
      case "down":
        return "translateY(-32px)";
      case "left":
        return "translateX(32px)";
      case "right":
        return "translateX(-32px)";
      default:
        return "";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        filter: inView ? "blur(0px)" : "blur(8px)",
        transform: inView ? "none" : getTransform(),
        transition: `all ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}
