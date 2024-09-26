

let intervalId; 
document.getElementById('GetDataButton').addEventListener('click', function() {
    
    if (!intervalId) {
        function fetchSensorData() {
            fetch('https://206.189.146.138/api/sensors', {
                method: 'GET'
            })
            .then(response => {
                if (!response.ok) {
                    alert("การตอบสนองของ server มีปัญหา");
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('timestamp').textContent = data.timestamp;
                document.getElementById('temperature').textContent = data.temperature;
                document.getElementById('humidity').textContent = data.humidity;
                document.getElementById('luxsensor').textContent = data.luxsensor;
                document.getElementById('motion').textContent = data.motion;
            })
        }
        intervalId = setInterval(fetchSensorData, 1000);
        fetchSensorData();
    }
});

document.getElementById('stopDataButton').addEventListener('click', function() {
    if (intervalId) {
        clearInterval(intervalId); 
        intervalId = null; 
    }
});



// -----------------------------------------------------------------------------------------------------------------

document.getElementById('previewBtn').addEventListener('click', function() {
    // ดึงค่าจาก input fields
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;

    // สร้างข้อมูล JSON สำหรับแสดงใน textarea
    const data = {
        id: studentId,
        name: studentName
    };

    // แสดงตัวอย่าง JSON ใน textarea
    document.getElementById('jsonPreview').value = JSON.stringify(data, null, 4);
});

document.getElementById('submitBtn').addEventListener('click', function() {
    // ดึงค่าจาก textarea เพื่อส่งไปยัง API
    const jsonData = document.getElementById('jsonPreview').value;

    // ส่งข้อมูลไปยัง API โดยใช้ method POST
    fetch('https://206.189.146.138/api/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        console.log('สำเร็จ:', data);
        alert('ส่งข้อมูลสำเร็จ');
    })
    .catch((error) => {
        console.error('ข้อผิดพลาด:', error);
        alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
    });
});






 




