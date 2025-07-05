package com.example.taskmanager.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Entity @Table(name = "tasks")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Task {
    @Id @UuidGenerator
    private String id;
    @Column(nullable = false, length = 255)
    private String title;
    @Column(columnDefinition = "text")
    private String description;
    @Enumerated(EnumType.STRING) @Column(nullable = false)
    private Category category;
    @Enumerated(EnumType.STRING) @Column(nullable = false)
    private Priority priority;
    @Convert(converter = LocalDateAttributeConverter.class)
    private LocalDate deadline;

    private boolean completed = false;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
