package com.quad.quad_back.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.quad.quad_back.entity.UserEntity;
import com.quad.quad_back.provider.JwtProvider;
import com.quad.quad_back.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        System.out.println("[JwtFilter] Request path: " + path);
        System.out.println("[JwtFilter] Authorization header: " + request.getHeader("Authorization"));

        // if (path.startsWith("/api/v1/review/")
        //     || path.equals("/api/v1/courseScraping")
        //     || path.startsWith("/actuator/")
        //     || path.equals("/actuator")
        //     || path.startsWith("/api/courses/scrape")
        //     || path.equals("/api/courses/scrape")
        // ) {
        //     System.out.println("[JwtFilter] Path is in permit list, skipping filter");
        //     filterChain.doFilter(request, response);
        //     return;
        // }

        System.out.println("THIS IS A PATH AFTER FILTER " + path);

        try {
            String token = parseBearerToken(request);
            System.out.println("[JwtFilter] Parsed token: " + token);

            if (token == null) {
                System.out.println("[JwtFilter] Token is null, skipping filter");
                filterChain.doFilter(request, response);
                return;
            }

            String email = jwtProvider.validate(token);
            System.out.println("[JwtFilter] Validated email: " + email);
            
            if (email == null) {
                System.out.println("[JwtFilter] Email validation failed");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{ \"code\":\"AF\", \"message\": \"Token validation failed.\"}");
                return;
            }

            UserEntity userEntity = userRepository.findByEmail(email);
            System.out.println("[JwtFilter] Found user: " + (userEntity != null ? userEntity.getEmail() : "null"));
            String role = userEntity.getRole(); // role : ROLE_USER or ROLE_ADMIN
            System.out.println("[JwtFilter] User role: " + role);

            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(role));

            AbstractAuthenticationToken authenticationToken = 
                new UsernamePasswordAuthenticationToken(email, null, authorities);
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(authenticationToken);

            SecurityContextHolder.setContext(securityContext);

        } catch(Exception exception) {
            System.out.println("[JwtFilter] Exception occurred: " + exception.getMessage());
            exception.printStackTrace();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{ \"code\":\"AF\", \"message\": \"" + exception.getMessage() + "\"}");
            return;
        }     

        filterChain.doFilter(request, response);
    }

    private String parseBearerToken(HttpServletRequest request){

        String authorization = request.getHeader("Authorization");

        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer ");
        if(!isBearer) return null;

        String token = authorization.substring(7);
        return token;
    }
}
