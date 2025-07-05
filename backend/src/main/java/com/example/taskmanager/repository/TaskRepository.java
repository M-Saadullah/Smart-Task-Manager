package com.example.taskmanager.repository;
import com.example.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
public interface TaskRepository extends JpaRepository<Task, String>, JpaSpecificationExecutor<Task> {}
