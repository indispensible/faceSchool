package com.gang.common.clawer;

import com.mysql.jdbc.Statement;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Created by 吕港 on 2017/12/9.
 */
public class Connector {
    public static Connection getConn() {
        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost:3306/testjava?characterEncoding=utf-8";
        String username = "root";
//        String password = "Lvgang1997MdL+";
        String password = "";
        Connection conn = null;
        try {
            Class.forName(driver); //classLoader,加载对应驱动
            conn = (Connection) DriverManager.getConnection(url, username, password);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }

    public static void insert(String sql) {
        Connection conn = getConn();
        Statement stmt = null;
        try {
            stmt = (Statement) conn.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            stmt.execute(sql);
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
