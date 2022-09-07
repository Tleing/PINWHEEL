// 绘制效果
// 文件加载
window.onload = function() {
    // 获取画布
    let canvas = document.getElementById("canvas");
    //创建context对象  从画布获取画笔   拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
    let ctx = canvas.getContext("2d");

    // 绘制雪花 
    let w =canvas.width;
    let h = canvas.height;
    let count = 150;//雪花个数

    let arr = [];
    for(i = 0; i< count; i++){
        // 雪花坐标
        arr.push({
            x:createRandom(0,w),
            y:createRandom(0,h),
            deg:createRandom(-10,10), //角度
            r:createRandom(2,10) //半径
        })

    }
        setInterval(() => {
            // 清空画布
            ctx.clearRect(0, 0, w, h);
            for(i = 0; i < count; i++){
                // y轴坐标
                arr[i].y += arr[i].r; //从上往下飘落
                arr[i].x += arr[i].r * Math.tan(createDeg(arr[i].deg)); //tan角度换算 从左到右飘落
            
                // 如果超出屏幕外重置
                if(arr[i].x > w || arr[i].y > h || arr[i].x < 0) {
                    arr[i].x = createRandom(0, w);
                    arr[i].y = 0;
                    arr[i].r = createRandom(1,5);
                    arr[i].deg = createRandom(-10,-10);
                }

                // 渐变效果
                let rGre = ctx.createRadialGradient(arr[i].x,arr[i].y,arr[i].r/2,arr[i].x,arr[i].y,arr[i].r);
                rGre.addColorStop(0,'rgba(255,255,255,1)');
                rGre.addColorStop(1,'rgba(255,255,255,0.1)');

                // 开始绘制
                ctx.beginPath();
                ctx.fillStyle = rGre;//渐变色
                ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI);//arc圆形
                ctx.fill();
            }

        }, 10)
  
}

// 随机数
function createRandom(m,n) {
    //Math.random()是从0到1的一个随机数 
    return Math.random() * ( n - m ) + m; //从m到n的一个随机数 
}

// 角度转换弧度制
function createDeg(n) {
    return n * Math.PI / 180;
}