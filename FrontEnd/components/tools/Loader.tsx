"use client";

const Loader = () => {
    return (
        <div className="h-full w-full make_center">
            <div className="w-[100px] h-[100px] make_center bg-palette-orange border-4 border-palette-white drop-shadow-lg rounded-md">
                <span className="loader"></span>
            </div>
        </div>
    );
};

export default Loader;
