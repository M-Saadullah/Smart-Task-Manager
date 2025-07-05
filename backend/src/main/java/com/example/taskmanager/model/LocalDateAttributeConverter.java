package com.example.taskmanager.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Converter(autoApply = true)
public class LocalDateAttributeConverter
        implements AttributeConverter<LocalDate,String> {

    // ISO_LOCAL_DATE = "yyyy-MM-dd"
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;

    @Override
    public String convertToDatabaseColumn(LocalDate attribute) {
        return (attribute == null ? null : attribute.format(FORMATTER));
    }

    @Override
    public LocalDate convertToEntityAttribute(String dbData) {
        return (dbData == null ? null : LocalDate.parse(dbData, FORMATTER));
    }
}
