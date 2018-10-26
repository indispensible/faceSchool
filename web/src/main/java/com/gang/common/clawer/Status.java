package com.gang.common.clawer;

public class Status {
    private boolean flag;
    private String message;

    public boolean getFlag() {
        return flag;
    }

    public String getMessage() {
        return message;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Status() {
        flag = true;
        message = "";
    }

    public Status(boolean flag, String message) {
        this.flag = flag;
        this.message = message;
    }
}
