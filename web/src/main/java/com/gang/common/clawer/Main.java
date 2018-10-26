package com.gang.common.clawer;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

public class Main {
//    public static void main(String[] args) {
//        String username = "";
//        String password = "";
//        Student student = new Student(username, password);
//        Student student = new Student();
//        Clawer clawer = new Clawer(student);
//
//        Status status = new Status();
//        int maxTry = 3; // User can try for maxTry times.
//        for (int i = 0; i < maxTry; i++) {
//            try {
//                String url = clawer.getImage(); // Usually takes 5 seconds.
//            } catch (IOException e) {
//                e.printStackTrace(); // Server error. Try again later. (Which is barely happen.)
//                continue;
//            }
//
//            // Server get the image url and return to user.
//            // User get the image to input username, password and chptcha.
//            String username = "";
//            String password = "";
//            String chptcha = "";
//            clawer.getStudent().setUsername(username);
//            clawer.getStudent().setPassword(password);
//            clawer.setChptcha(chptcha);
//            status = clawer.login();
//            if (status.getFlag()) {
//                break;
//            } else if (status.getMessage().equals("Log in error.")) {
//                // Ask user to input username, password and chptcha again.
//                clawer.getStudent().setUsername(username);
//                clawer.getStudent().setPassword(password);
//            } else {
//                // Maybe more error messages in the future.
//            }
//        }
//        if (!status.getFlag() && status.getMessage().equals("Log in error.")) {
//            // User log in error. Warn and try again later.
//        } else {
//            // Maybe more error messages in the future.
//        }
//        List<Course> courses = clawer.getCourses();
//        for (Course course: courses) {
//            String sql = course.getSql();
//            // A sql to insert courses.
//        }
//    }

    private static Clawer clawer;

//    public static void main(String[] args) throws IOException {
//        clawer = login();
//        String chptcha = "";
//        try {
//            System.out.println("Please input captcha123123123: ");
//            InputStreamReader is = new InputStreamReader(System.in);
//            BufferedReader br = new BufferedReader(is);
//            chptcha = br.readLine();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        checkLogWithFetch("2015111600", "lvgang123zxc", chptcha);
//    }


    public static Clawer login() throws IOException {
        clawer = new Clawer(new Student());
        clawer.getImage();
        return clawer;
    }

    public static boolean checkLogWithFetch(String username, String password, String chptcha) {
        Student student = new Student(username, password);
        clawer.setStudent(student);
        clawer.setChptcha(chptcha);
        Status status = clawer.login();
        if (!status.getFlag()) {
            return false;
        }
        List<Course> courses = clawer.getCourses();
        if (courses.size() == 0) {
            return false;
        }
        for (Course course: courses) {
            String sql = course.getSql(username);
            Connector.insert(sql);
        }
        System.out.println("OJBK");
        return true;
    }
}
