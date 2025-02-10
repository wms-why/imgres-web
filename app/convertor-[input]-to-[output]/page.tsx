import { useParams } from "next/navigation";

interface PathParams {
  input: string;
  output: string;

  [key: string]: string | string[];
}

export default function () {
  const { input, output } = useParams<PathParams>();


  console.log(input, output);

  return (

    <div className={'w-full min-h-screen relative overflow-hidden'}>

      {/* 规划hero区域 */}

      {/* 规划 */}
    </div>
  )

}