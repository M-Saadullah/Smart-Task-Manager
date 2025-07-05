package com.example.taskmanager.spec;
import com.example.taskmanager.model.*;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.*;
import java.util.*;
public class TaskSpecification {
    public static Specification<Task> build(String search, Category category, Priority priority, Boolean completed) {
        return (Root<Task> root, CriteriaQuery<?> cq, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (search != null && !search.isBlank()) {
                String like = "%" + search.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("title")), like),
                        cb.like(cb.lower(root.get("description")), like)
                ));
            }
            if (category != null) predicates.add(cb.equal(root.get("category"), category));
            if (priority != null) predicates.add(cb.equal(root.get("priority"), priority));
            if (completed != null) predicates.add(cb.equal(root.get("completed"), completed));
            return cb.and(predicates.toArray(Predicate[]::new));
        };
    }
}
