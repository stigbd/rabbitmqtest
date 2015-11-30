package github.stigbd;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.ExceptionHandler;

import java.io.IOException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class Send {

    private final static String QUEUE_NAME = "hello";
    private static int COUNTER = 0;
    private static ConnectionFactory factory;
    private static Connection connection;
    private static Channel channel;

    private static void setupConnection() {
        try {
            factory = new ConnectionFactory();
            factory.setHost("rabbitmqtest_rabbitmq_1");
            factory.setRequestedHeartbeat(60);
            connection = factory.newConnection();
            channel = connection.createChannel();
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void sendToQueue() {
        ++COUNTER;
        try {
            String message = new String("ID: " + COUNTER + " -- Hello World, from java!");
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes("UTF-8"));
            System.out.println(" [x] Sent '" + message + "'");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void closeConnection() {
        try {
            channel.close();
            connection.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] argv) throws Exception {
        setupConnection();
        while(true) {
            sendToQueue();
            TimeUnit.SECONDS.sleep(1);
        }
    }
}
