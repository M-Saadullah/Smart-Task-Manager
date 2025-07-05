package com.example.taskmanager.dto;
import com.example.taskmanager.model.Category;
import com.example.taskmanager.model.Priority;
import java.time.LocalDate;
public record TaskResponse(
        String id,
        String title,
        String description,
        Category category,
        Priority priority,
        LocalDate deadline,
        boolean completed,
        String createdAt,
        String updatedAt
) {}
