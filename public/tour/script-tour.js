document.addEventListener("DOMContentLoaded", () => {
    const tourForm = document.getElementById("tourForm");
    const tourImage = document.getElementById("tour-image");
    const previewImg = document.getElementById("preview");

    tourImage.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            previewImg.src = "https://placehold.co/600x400?text=Preview+Image";
        }
    });

    tourForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(tourForm);

        try {

            const response = await fetch("http://localhost:3000/add-tour", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert("Thêm mới tour du lịch thành công!");
                tourForm.reset();
                previewImg.src = "https://placehold.co/600x400?text=Preview+Image";
            } else {
                alert("Lỗi: " + (result.message || "Không thể thêm tour."));
            }
        } catch (error) {
            console.error("Lỗi khi kết nối đến server:", error);
            alert("Không thể kết nối tới server. Vui lòng kiểm tra lại backend!");
        }
    });
});