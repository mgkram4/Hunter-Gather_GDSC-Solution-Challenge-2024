import { Button } from "@/components/ui/button";

export default function Card() {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <a href="#">
        <img className="rounded-t-lg" src="/image1.jpg" alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Title Prop
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">Desciption Prop</p>
        <Button className="bg-green-600">Learn More</Button>
      </div>
    </div>
  );
}
