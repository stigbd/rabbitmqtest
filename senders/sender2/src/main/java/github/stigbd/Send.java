package github.stigbd;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class Send {

    private final static String QUEUE_NAME = "hello";
    private static int COUNTER = 0;
    private static Connection connection;
    private static Channel channel;

    private static void setupConnection() throws IOException, TimeoutException {
        try {
            ConnectionFactory factory = new ConnectionFactory();
            factory.setHost("rabbitmq");
            factory.setRequestedHeartbeat(60);
            connection = factory.newConnection();
            channel = connection.createChannel();
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    private static void sendToQueue() throws IOException {
        ++COUNTER;
        try {
            String message = "ID: " + COUNTER + " -- Hello World, from java!";
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes("UTF-8"));
            System.out.println(" [x] Sent '" + message + "'");

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    private static void closeConnection() throws TimeoutException, IOException {
        try {
            channel.close();
            connection.close();
        } catch (IOException | TimeoutException e) {
            e.printStackTrace();
            throw e;
        }
    }

    public static void main(String[] argv) {
        try {
            setupConnection();
        } catch (IOException | TimeoutException e) {
            e.printStackTrace();
            System.exit(1);
        }
        while(true) {
            try {
                sendToQueue();
                TimeUnit.SECONDS.sleep(1);
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
                System.exit(1);
            }
        }
    }
}
