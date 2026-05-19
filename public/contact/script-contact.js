document.addEventListener("DOMContentLoaded", async () => {
    const tourListContainer = document.querySelector(".tour-list");

    if (!tourListContainer) return;

    // Helper to format price to VND style (e.g. 2.500.000)
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price);
    };

    try {
        const response = await fetch("/get-tours");
        const data = await response.json();

        if (response.ok && data.tours && data.tours.length > 0) {
            // Clear the static mock cards
            tourListContainer.innerHTML = "";

            data.tours.forEach((tour) => {
                const tourCard = document.createElement("div");
                tourCard.className = "tour-card";

                // Resolve image source: checks if it's already an absolute/relative path or a filename in /uploads
                const imageSrc = tour.image.startsWith("http") || tour.image.startsWith("./") || tour.image.startsWith("../")
                    ? tour.image
                    : `../uploads/${tour.image}`;

                tourCard.innerHTML = `
                    <div class="tour-image">
                        <img src="${imageSrc}" alt="${tour.name}">
                    </div>
                    <div class="tour-content">
                        <div class="tour-location">
                            ${tour.location}
                        </div>
                        <h3 class="tour-name">
                            ${tour.name}
                        </h3>
                        <p class="tour-description">
                            ${tour.description}
                        </p>
                        <div class="tour-footer">
                            <div class="tour-price">
                                ${formatPrice(tour.price)}đ
                            </div>
                            <div class="tour-days">
                                ${tour.days} ngày
                            </div>
                        </div>
                    </div>
                `;

                tourListContainer.appendChild(tourCard);
            });
        } else if (data.tours && data.tours.length === 0) {
            // Optional: If you want to keep the mock cards when database is empty,
            // comment out the line below. Otherwise, it will show this nice friendly empty state.
            tourListContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666; font-size: 1.1rem; width: 100%;">
                    <p style="margin-bottom: 15px;">Chưa có tour du lịch nào trong cơ sở dữ liệu.</p>
                    <a href="../tour/create-tour.html" style="display: inline-block; padding: 10px 20px; background-color: #ff5a5f; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background 0.2s;">
                        + Thêm tour đầu tiên
                    </a>
                </div>
            `;
        }
    } catch (error) {
        console.error("Lỗi khi tải danh sách tour từ server:", error);
    }
});
