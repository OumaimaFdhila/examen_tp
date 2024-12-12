export default function Grid(){
    const gridSize = 7; 

    return (
        <div className="absolute z-0 w-[70%]  h-full rounded-full overflow-hidden opacity-15 shaded-edges">
            <div className="relative w-full  h-full aspect-square grid grid-cols-5 gap-0   ">
            {Array.from({ length: gridSize * gridSize+20 }).map((_, index) => (
                <div
                key={index}
                className="relative border border-gray-400 w-full h-full"
                ></div>
            ))}
            </div>
        </div>
    );
};
