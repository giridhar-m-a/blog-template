type props = {
  content: string;
};

const TipTapRender: React.FC<props> = ({ content }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="rich-text whitespace-pre-wrap"
    ></div>
  );
};

export default TipTapRender;
