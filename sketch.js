// p5.prototype.VERSION 2.1.1
let table;
let h;
let s;
let b;

async function setup() {
    const canvas = createCanvas(1000, 700, WEBGL);
    canvas.parent('sim-container');
    angleMode(DEGREES);
    try {
        table = await loadTable('colors.csv', {
            delimiter: ',',
            header: true
        });
        console.log('Table loaded:', table);
    } catch (err) {
        console.error('Failed to load CSV', err);
    }
    //color pallete in HSB
    colorMode(HSB, 360, 100, 100);
    palette = 0;
    getColor(1);
    fill(h,s,b);
    stroke(h, s, b);
    strokeWeight(4);
}

//to get color from color palette
function getColor(col) {
    h = int(table.get(palette, col * 3));
    s = int(table.get(palette, col * 3 + 1));
    b = int(table.get(palette, col * 3 + 2));
}

function draw() {
    background(235, 20, 100, 128);
    orbitControl();
    //draw the vertex counter clockwise starting from the bottom
    beginShape();
    vertex(220, -20);
    vertex(-180, 10);
    vertex(-180, -160);
    vertex(220, -150);
    endShape(CLOSE);

    beginShape();
    vertex(300, -60);
    vertex(223, -30);
    vertex(223, -135);
    vertex(300, -100);
    endShape(CLOSE);

    push();
    strokeWeight(5);
    stroke('black');
    ellipse(310, -80, 50, 180);
    ellipse(340, -80, 50, 160);
    ellipse(370, -80, 40, 140);
    pop();

    // translate(360, -65, 0)
    // beginShape(POINTS);
    // for(let i = 0; i < 360; i += 1) {
    //     let x = cos(i) * 100;
    //     let y = sin(i) * 100;
    //     vertex(x, y);
    // }
    // endShape();

}
