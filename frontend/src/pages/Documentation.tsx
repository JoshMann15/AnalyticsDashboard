import { FileText, Code, Server } from "lucide-react";
const Documentation = () => {
  const technologies = [
    {
      title: "Frontend",
      description: "Modern and responsive frontend built with industry-standard technologies",
      items: [
        {
          name: "React",
          description: "A JavaScript library for building user interfaces",
          icon: <Code className="h-6 w-6" />
        },
        {
          name: "TypeScript",
          description: "Adds static typing to JavaScript for better development experience",
          icon: <Code className="h-6 w-6" />
        },
        {
          name: "Tailwind CSS",
          description: "A utility-first CSS framework for rapid UI development",
          icon: <FileText className="h-6 w-6" />
        },
        {
          name: "Shadcn/ui",
          description: "A collection of beautifully designed components",
          icon: <FileText className="h-6 w-6" />
        }
      ]
    },
    {
      title: "Backend",
      description: "Robust and scalable backend infrastructure",
      items: [
        {
          name: "Flask",
          description: "Lightweight WSGI web application framework in Python",
          icon: <Server className="h-6 w-6" />
        },
        {
          name: "Python",
          description: "Powerful programming language for backend development",
          icon: <Code className="h-6 w-6" />
        }
      ]
    }
  ];
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Made with 💖 by JoshMann15.<br />
            Learn about the technologies and frameworks used to build this demo application
          </p>
        </header>
        <div className="space-y-12">
          {technologies.map((section) => (
            <section key={section.title} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
                <p className="text-muted-foreground">{section.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Documentation;