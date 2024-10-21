import { JSONContent } from "@tiptap/react";

export const demoData: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "Messaging for Internet of Things applications can be optimized by using Docker containers with MQTT (Message Queuing Telemetry Transport). Scalability, portability, and smooth broker deployment are guaranteed by Docker encapsulation. In a variety of settings, MQTT brokers dependably enable communication between linked devices thanks to Docker's effective isolation and resource management. With this method, MQTT service configuration and management are made more flexible, making the development and deployment processes for Internet of Things applications easier. Deploying MQTT brokers in Docker containers improves productivity and makes it easier to integrate into intricate IoT ecosystems, enabling nimble and scalable solutions for a range of use cases, be they for smart city applications, industrial monitoring, or home automation.",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Requirements:",
        },
      ],
    },
    {
      type: "orderedList",
      attrs: {
        start: 1,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A desktop or laptop that has Docker loaded",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "VS Code",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
    },
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Procedure:",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "• Create a directory with the name of your project.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "• Inside the directory create a .yml/.yaml file named “docker-compose.yml”.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "• In VS Code open the directory.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "• Inside your project directory create a folder named Mqtt or any name you wanted",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "• Inside the Mqtt directory create three directories named config, data, log",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "• Place the code given below in the docker compose file",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Copy code",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: 'version: "3.9"\nservices:\nmqtt:\n    image: eclipse-mosquitto:latest\n    restart: always\n    ports:\n      - 1883:1883\n    volumes:\n      - ./Mqtt/config/mosquitto.conf:/mosquitto/config/mosquitto.conf\n      - ./Mqtt/config/password_file:/mosquitto/config/password_file\n      - ./Mqtt/data:/mosquitto/data\n      - ./Mqtt/log:/mosquitto/log\n',
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "• Save the file",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "• Go to the Mqtt/config directory and create a file named mosquitto.conf.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "• Inside the mosquitto.conf file place the below code",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "If you want to allow connections without password set allow_anonymous true instead of allow_anonymous false.",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 3,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Open the terminal and run the command given below",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Copy code",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "docker compose up -d",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "Check if the container is running properly by running the command below:",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Copy code",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "docker ps",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
    },
    {
      type: "image",
      attrs: {
        src: "https://placehold.co/600x400/EEE/31343C",
        alt: "Docker Ps container Id.png",
        title: null,
      },
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "If its working properry run the command below:",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Copy code",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "docker exec -it {first three or four letters of container id } sh",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 6,
      },
      content: [
        {
          type: "text",
          text: "For Example :",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Copy code",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "docker exec -it 918 sh",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "Then the terminal cursor will change like this",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://placehold.co/600x400/EEE/31343C",
        alt: "Docker MQTT terminal.png",
        title: null,
      },
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "Then execute the code below in the terminal to erase all users and create new users:",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Copy code",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "mosquitto_passwd -b mosquitto/config/password_file user_name",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "For adding new users to existing users use thecode below in the terminal :",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Copy code",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "mosquitto_passwd -b mosquitto/config/password_file new_user_name password",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
    },
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Verifying that it is operating correctly:",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "To test, use programs like MQTT-Explorer or Postman.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "Use the IP address of the computer running Docker if you are on a different machine connected to the same network, or use ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "http://localhost",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class: "underline text-accent",
              },
            },
          ],
          text: "localhost",
        },
        {
          type: "text",
          text: " and port 1883.",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "In conclusion:",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "Configuring a Docker container for a MQTT broker enhances Internet of Things applications in two ways: scalability and simplicity of deployment. Enclosing MQTT services within Docker ensures seamless device connection. This systematic approach simplifies development and deployment while providing flexibility for a variety of IoT use cases, such as smart cities and home automation.",
        },
      ],
    },
  ],
};
