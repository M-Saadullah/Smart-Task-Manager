package com.example.taskmanager.dto;
import com.example.taskmanager.model.Category;
import com.example.taskmanager.model.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
public record TaskRequest(
        @NotBlank String title,
        String description,
        @NotNull Category category,
        @NotNull Priority priority,
        LocalDate deadline,
        Boolean completed
) {}
