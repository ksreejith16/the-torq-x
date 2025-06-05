import React from 'react';

const GalleryFilter = ({ activeGroup, setActiveGroup, galleryData, setFiltered }) => {
    const filterGallery = (group) => {
        setActiveGroup(group);
        if (group === "all") {
            setFiltered(galleryData);
        } else {
            setFiltered(galleryData.filter((item) => item.group === group));
        }
    };

    return (
        <div className="gallery-filter-buttons">
            <button onClick={() => filterGallery("all")} className={activeGroup === "all" ? "active" : ""}>
                All
            </button>
            <button onClick={() => filterGallery("brand")} className={activeGroup === "brand" ? "active" : ""}>
                Brand
            </button>
            <button onClick={() => filterGallery("design")} className={activeGroup === "design" ? "active" : ""}>
                Design
            </button>
            <button onClick={() => filterGallery("motion")} className={activeGroup === "motion" ? "active" : ""}>
                Motion
            </button>
            <button onClick={() => filterGallery("printing")} className={activeGroup === "printing" ? "active" : ""}>
                Printing
            </button>
        </div>
    );
};

export default GalleryFilter;
