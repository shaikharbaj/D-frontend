import React from "react";

type Props = {
  children: React.ReactNode;
};

const Section: React.FC<Props> = ({ children }: Props) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 mb-4 px-3">
      {children}
    </section>
  );
};

export default Section;
