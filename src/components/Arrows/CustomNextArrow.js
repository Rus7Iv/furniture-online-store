import Image from "next/image";

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block" }}>
      <Image
        src="/arrow-right.svg"
        alt="Next"
        width={24}
        height={24}
        onClick={onClick}
      />
    </div>
  );
};

export default CustomNextArrow;
