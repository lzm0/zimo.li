export default function TrafficLight() {
  return (
    <div className="traffic-lights flex space-x-2 absolute left-5 top-5">
      <button className="rounded-full h-3 w-3 border border-black border-opacity-10 bg-[#ff6159] focus:outline-none"></button>
      <button className="rounded-full h-3 w-3 border border-black border-opacity-10 bg-[#ffbd2e] focus:outline-none"></button>
      <button className="rounded-full h-3 w-3 border border-black border-opacity-10 bg-[#28c941] focus:outline-none"></button>
    </div>
  );
}
