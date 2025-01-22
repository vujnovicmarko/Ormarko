
package com.example.ormarko.ormarko.Security;

import com.example.ormarko.ormarko.Service.MarketerService;
import com.example.ormarko.ormarko.Service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserService userService;
    private final MarketerService marketerService;
    private final CustomSuccesHandler succesHandler;

    @Autowired
    public SecurityConfig(UserService userService, MarketerService marketerService, CustomSuccesHandler succesHandler) {
        this.userService = userService;
        this.marketerService = marketerService;
        this.succesHandler = succesHandler;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return userService;
    }

    @Bean
    public UserDetailsService marketerDetailsService(){
        return marketerService;
    }



    @Bean
    public AuthenticationProvider userAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    //treba implementirati da se ovo koristi kad se radio o oglašivaču - kad se stavi @bean error
    @Bean
    public AuthenticationProvider marketerAuthenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(marketerService);
        provider.setPasswordEncoder(passwordEncoder());
        provider.setPreAuthenticationChecks(user -> {
            System.out.println("Retrieved Marketer: " + user.getUsername());
        });
        return provider;
    }

    @Bean
    @Primary
    public AuthenticationManager authenticationManager() throws Exception {
        return new ProviderManager(List.of(userAuthenticationProvider()));
    }
    @Bean
    public AuthenticationManager marketerAuthenticationManager() {
        return new ProviderManager(List.of(marketerAuthenticationProvider()));
    }

    @Bean
    public SecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .securityContext(securityContext -> securityContext.securityContextRepository(securityContextRepository()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(login -> login
                        .loginPage("/login")
                        .loginProcessingUrl("/api/login").permitAll()
                        .successHandler((request, response, authentication) -> {
                            // Return JSON to the front-end
                            response.setContentType("application/json");
                            response.getWriter().write("{\"success\":true}");
                            response.getWriter().flush();
                        })
                        //.defaultSuccessUrl("/profile", true)
                        .failureHandler((request, response, exception) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\": \"Invalid credentials\"}");
                            response.getWriter().flush();
                        })
                )
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/SearchIcon.png", "/OrmarkoLogo.png").permitAll();
                    registry.requestMatchers("/login", "/register").permitAll();
                    registry.requestMatchers("/api/login").permitAll();
                    registry.requestMatchers("/api/signup/**","api/login/**").permitAll();
                    registry.requestMatchers("/", "/home", "/api/marketers/**", "/api/default/getAll").permitAll();
                    registry.requestMatchers( "/api/default/**").permitAll();
                    registry.requestMatchers("/assets/**", "/static/**", "/index.html").permitAll();
                    registry.requestMatchers("/api/user/search").permitAll();
                    registry.requestMatchers("/api/user/profile/**").permitAll();
                    registry.requestMatchers("/api/user/profile").hasRole("USER");
                    registry.requestMatchers("/api/marketer/**").hasRole("MARKETER");

                    //registry.requestMatchers("/**/*.css").permitAll();
                    //registry.requestMatchers("/**/*.js").permitAll();
                    //registry.requestMatchers("/**").permitAll();
                    registry.requestMatchers("/user/**", "/profile", "/api/user/profile").authenticated();
                    registry.anyRequest().authenticated();
                })
                .logout(l -> l
                        .logoutUrl("/logout")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .logoutSuccessUrl("/")
                )
                .oauth2Login(o -> o
                        .loginPage("/api/login")
                        .successHandler(succesHandler)
                )
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        List<ClientRegistration> registrations = new ArrayList<>();
        registrations.add(googleClientRegistration());
        return new InMemoryClientRegistrationRepository(registrations);
    }

    private ClientRegistration googleClientRegistration() {
        return ClientRegistration.withRegistrationId("google")
                .clientId("1081883435015-2ujbp1k9v81q86qg68gnfvkb55vjpcot.apps.googleusercontent.com")
                .clientSecret("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")
                .scope("email", "profile")
                .authorizationUri("https://accounts.google.com/o/oauth2/auth")
                .tokenUri("https://oauth2.googleapis.com/token")
                .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
                .userNameAttributeName("sub")
                .redirectUri("{baseUrl}/login/oauth2/code/google")
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .build();
    }
}
