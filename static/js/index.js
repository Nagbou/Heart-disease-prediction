document.getElementById('predictForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        Swal.fire({
            title: result.prediction === 1 ? 'High Risk Detected' : 'Low Risk Detected',
            text: `Probability of having heart disease: ${(result.probability[1] * 100).toFixed(2)}%.`,
            icon: result.prediction === 1 ? 'warning' : 'success',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'colored-popup',
                title: 'custom-title'
            }
        });
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: `An error occurred: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
