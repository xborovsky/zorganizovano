package cz.zorganizovano.backend.payment;

import java.text.SimpleDateFormat;
import java.util.Date;

public class PaymentInfo implements PaymentDefaults {

    private String accountNumber;
    private String bankCode;
    private String variableSymbol;
    private double amount;
    private String currency;
    private String message;
    private Date date;

    public PaymentInfo(String orderNumber, double amount, Date maturity) {
        this.accountNumber = ACCOUNT_NUMBER;
        this.bankCode = BANK_CODE;
        this.currency = CURRENCY;
        this.variableSymbol = orderNumber;
        this.amount = amount;
        this.date = maturity;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getVariableSymbol() {
        return variableSymbol;
    }

    public void setVariableSymbol(String variableSymbol) {
        this.variableSymbol = variableSymbol;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate() {
        return date;
    }

    public String getDateFormatted() {
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }

    public void setDate(Date date) {
        this.date = date;
    }


}
