package security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class SecurityFilter implements Filter {


    @Autowired
    private SessionManager sessionManager;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);

        try {

            HttpServletRequest req = (HttpServletRequest) request;

            if(req.getMethod().equals("OPTIONS")){
                chain.doFilter(request, response);
                return;
            }

            String username = req.getHeader("Username");
            String authorizationKey = req.getHeader("Authorization");

            if (sessionManager.getUserSessions().get(username).equals(authorizationKey)) {
                chain.doFilter(request, response);
                return;
            }

            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "User is not authorized, please login with a valid account!");
        }

        catch(Exception e){
            e.printStackTrace();
            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "User is not authorized, please login with a valid account!");
        }


    }

}
