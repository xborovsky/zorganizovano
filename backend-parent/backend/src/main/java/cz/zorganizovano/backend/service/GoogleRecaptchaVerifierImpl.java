package cz.zorganizovano.backend.service;

import static cz.zorganizovano.backend.keys.Keys.RECAPTCHA_SECRET_KEY;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import javax.net.ssl.HttpsURLConnection;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

@Service
public class GoogleRecaptchaVerifierImpl implements GoogleRecaptchaVerifier {

    private static final String RECAPTCHA_SERVICE_URL = "https://www.google.com/recaptcha/api/siteverify";

    @Override
    public boolean isValid(String clientCaptcha) throws IOException {
        if (clientCaptcha == null || "".equals(clientCaptcha)) {
            return false;
        }

        URL obj = new URL(RECAPTCHA_SERVICE_URL);
        HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

        con.setRequestMethod("POST");
        con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

        //add client result as post parameter
        String postParams = "secret=" + RECAPTCHA_SECRET_KEY + "&response=" + clientCaptcha;

        // send post request to google recaptcha server
        con.setDoOutput(true);
        try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
            wr.writeBytes(postParams);
            wr.flush();
        }

        int responseCode = con.getResponseCode();

        if (responseCode == 200) {
            StringBuilder response;
            try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
                String inputLine;
                response = new StringBuilder();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
            }

            try {
                JSONParser parser = new JSONParser();
                JSONObject json = (JSONObject) parser.parse(response.toString());

                Boolean success = (Boolean) json.get("success");

                return success;
            } catch (ParseException e) {
                throw new IOException(e);
            }
        } else {
            return false;
        }
    }

}
