// Абстракція
abstract class Shape {
    protected Renderer renderer;

    public Shape(Renderer renderer) {
        this.renderer = renderer;
    }

    abstract void draw();
}

// Реалізація
interface Renderer {
    void renderShape(String shape);
}

class OpenGLRenderer implements Renderer {
    public void renderShape(String shape) {
        System.out.println("Rendering " + shape + " with OpenGL");
    }
}

class DirectXRenderer implements Renderer {
    public void renderShape(String shape) {
        System.out.println("Rendering " + shape + " with DirectX");
    }
}

// Конкретна абстракція
class Circle extends Shape {
    public Circle(Renderer renderer) {
        super(renderer);
    }

    public void draw() {
        renderer.renderShape("Circle");
    }
}

// Використання
public class Main {
    public static void main(String[] args) {
        Renderer openGL = new OpenGLRenderer();
        Renderer directX = new DirectXRenderer();

        Shape circle = new Circle(openGL);
        circle.draw(); // Виведе: Rendering Circle with OpenGL

        circle = new Circle(directX);
        circle.draw(); // Виведе: Rendering Circle with DirectX
    }
}
