package security;

import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class SessionManager {

    private HashMap<String,String> userSessions;

    public SessionManager() {
        userSessions=new HashMap<>();
    }

    public HashMap<String, String> getUserSessions() {
        return userSessions;
    }

    public void setUserSessions(HashMap<String, String> userSessions) {
        this.userSessions = userSessions;
    }
}
