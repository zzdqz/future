package com.zq.domain;

public class Message {
    public Message(boolean result, String detail) {
        this.result = result;
        this.detail = detail;
    }

    public Message() {
    }

    private boolean result;
    private  String detail;

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}
