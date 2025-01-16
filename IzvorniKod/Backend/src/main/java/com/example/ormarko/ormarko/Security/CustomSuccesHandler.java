package com.example.ormarko.ormarko.Security;

import com.example.ormarko.ormarko.Model.User;
import com.example.ormarko.ormarko.Repository.UserRepository;
import com.example.ormarko.ormarko.Service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;

@Component
public class CustomSuccesHandler implements AuthenticationSuccessHandler {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String redirectURL; // slucaj koji se nikad nismije dogoditi
        if (authentication.getPrincipal() instanceof DefaultOAuth2User) {
            DefaultOAuth2User userDetails = (DefaultOAuth2User) authentication.getPrincipal();
            System.out.println("OAuth2 user details: " + userDetails.getAttributes()); // Debug line
            String username = userDetails.getAttribute("given_name") != null ? userDetails.getAttribute("given_name") :
                    userDetails.getAttribute("name") != null ? userDetails.getAttribute("name") :
                            Objects.requireNonNull(userDetails.getAttribute("email")).toString().split("@")[0];
            String email = userDetails.getAttribute("email");
            if (userRepository.findByEmail(email).isEmpty()){
                User newUser = new User();
                newUser.setPass("dummypassword");
                newUser.setUsername(username);
                newUser.setCity("Berlin");
                newUser.setCountry("Germany");
                newUser.setE_mail(email);
                userRepository.save(newUser);
            }
        }
        redirectURL = "/profile";

        //redirectURL = "https://ormarkodeploy-c46f4289b2cf.herokuapp.com/profile";
        new DefaultRedirectStrategy().sendRedirect(request, response, redirectURL);

    }
    /*@Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String redirectURL = "/profile"; // slucaj koji se nikad nismije dogoditi
        if (authentication.getPrincipal() instanceof DefaultOAuth2User) {
            DefaultOAuth2User userDetails = (DefaultOAuth2User) authentication.getPrincipal();
            System.out.println("OAuth2 user details: " + userDetails.getAttributes()); // Debug line
            String email = userDetails.getAttribute("email");
            if (email == null) {
                throw new OAuth2AuthenticationException("Email not provided by OAuth2 provider");
            }
            if (userRepository.findByEmail(email).isEmpty()) {
                String tempusername = userDetails.getAttribute("given_name") != null ? userDetails.getAttribute("given_name") :
                        userDetails.getAttribute("name") != null ? userDetails.getAttribute("name") :
                                Objects.requireNonNull(userDetails.getAttribute("email")).toString().split("@")[0];
                String username = tempusername;
                int counter = 0;
                while (userRepository.findByUsername(username).isPresent()) {
                    counter++;
                    username = tempusername + counter;
                }
                User newUser = new User();
                newUser.setPass("dummypassword");
                newUser.setUsername(username);
                newUser.setCity("Berlin");
                newUser.setCountry("Germany");
                newUser.setE_mail(email);
                userRepository.save(newUser);
                redirectURL = request.getScheme() + "://" + request.getServerName() +
                        (request.getServerPort() == 80 || request.getServerPort() == 443 ? "" : ":" + request.getServerPort()) +
                        request.getContextPath() + "/profile";
                //redirectURL = "https://ormarkodeploy-c46f4289b2cf.herokuapp.com/profile";
            } else if (userRepository.findByEmail(email).isPresent() && userRepository.findByEmail(email).get().getGoogleoauth()) {
                redirectURL = request.getScheme() + "://" + request.getServerName() +
                        (request.getServerPort() == 80 || request.getServerPort() == 443 ? "" : ":" + request.getServerPort()) +
                        request.getContextPath() + "/profile";
            }else {
                redirectURL = request.getScheme() + "://" + request.getServerName() +
                        (request.getServerPort() == 80 || request.getServerPort() == 443 ? "" : ":" + request.getServerPort()) +
                        request.getContextPath() + "/login";
                throw new OAuth2AuthenticationException("Email provided is alraedy in use!");
            }
        }
        new DefaultRedirectStrategy().sendRedirect(request, response, redirectURL);
    }*/
}
