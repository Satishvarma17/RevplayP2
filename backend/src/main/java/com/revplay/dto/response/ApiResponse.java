package com.revplay.dto.response;

import lombok.*;

<<<<<<< HEAD
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
=======
@Getter
@AllArgsConstructor
>>>>>>> origin/develop
public class ApiResponse<T> {

    private boolean success;
    private String message;
    private T data;
<<<<<<< HEAD
    private LocalDateTime timestamp;

    public ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
=======

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    public static <T> ApiResponse<T> failure(String message) {
        return new ApiResponse<>(false, message, null);
>>>>>>> origin/develop
    }
}