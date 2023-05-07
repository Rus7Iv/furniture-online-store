import Image from "next/image";

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block" }}>
      <Image
        src="/arrow-left.svg"
        alt="Prev"
        width={24}
        height={24}
        onClick={onClick}
      />
    </div>
  );
};

export default CustomPrevArrow;
