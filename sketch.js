// p5.prototype.VERSION 2.1.1

//color palette: vintage coral scheme
let table;
let h;
let s;
let b;

async function setup() {
    const canvas = createCanvas(750, 600, WEBGL);
    canvas.parent('sim-container');
    angleMode(DEGREES);
    // to load table from colors.csv and catch errors if the table is not loaded
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
    palette = 1;
    getColor(3);
}

//to get color from color palette
function getColor(col) {
    h = int(table.get(palette, col * 3));
    s = int(table.get(palette, col * 3 + 1));
    b = int(table.get(palette, col * 3 + 2));
}

function draw() {
    background(h, s, b);
    orbitControl();
    fill(255);
    push();
    beginShape(LINES);
    vertex(220, -20);
    vertex(-180, 10);
    vertex(-180, -160);
    vertex(220, -150);
    endShape();
    noFill();
    bezier(220, -20, 240, -28, 240, -142, 220, -150);
    ellipse(-185, -75, 100, 170); //use ellipsoid later 
    ellipse(-195, -75, 80, 160); 
    ellipse(-200, -75, 40, 40);
    ellipse(-200, -75, 15, 15); 
    pop();

    push();
    beginShape(LINES);
    vertex(300, -55);
    vertex(230, -40);
    vertex(230, -135);
    vertex(300, -120);
    endShape(); 
    noFill();
    bezier(300, -55, 320, -50, 320, -115, 300, -120);
    pop();

    push();
    noFill();
    bezier(-70, 200, -120, 150, -30, 50, 100, -10);
    bezier(-195, 200, -165, 140, -125, 90, -175, 10);
    beginShape(LINES);
    vertex(-195, 200);
    vertex(-70, 200);
    endShape();
    pop();
}
