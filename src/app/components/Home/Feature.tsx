import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import Neon from "../Neon";

interface FeatureParams {
  Icon: React.ElementType,
  title: string,
  desc: string
}
const Feature = ({Icon,title,desc}: FeatureParams) => {
  return (
    <div
      className="relative group p-8 w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)] flex flex-col rounded-2xl glass-bg transition-all duration-500 hover:border-[#00D1FF]/50 hover:shadow-[0_0_30px_rgba(0,209,255,0.2)] hover:-translate-y-2 animate-float"
    >
      <Neon/>
      <div className="mb-4 text-xl text-[#00D1FF] drop-shadow-[0_0_8px_rgba(0,209,255,0.8)] transition-transform duration-500">
        <Icon/>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed text-sm">
       {desc}
      </p>
    </div>
  );
};

export default Feature;
