package com.dima.jelearning.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Treponse.
 */
@Entity
@Table(name = "treponse")
public class Treponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rfirst")
    private Boolean rfirst;

    @Column(name = "rsecond")
    private Boolean rsecond;

    @Column(name = "rthird")
    private Boolean rthird;

    @Column(name = "rfourth")
    private Boolean rfourth;

    @ManyToOne
    private Tquestion reponseQuestion;

    @ManyToOne
    private Tresult reponseResult;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isRfirst() {
        return rfirst;
    }

    public Treponse rfirst(Boolean rfirst) {
        this.rfirst = rfirst;
        return this;
    }

    public void setRfirst(Boolean rfirst) {
        this.rfirst = rfirst;
    }

    public Boolean isRsecond() {
        return rsecond;
    }

    public Treponse rsecond(Boolean rsecond) {
        this.rsecond = rsecond;
        return this;
    }

    public void setRsecond(Boolean rsecond) {
        this.rsecond = rsecond;
    }

    public Boolean isRthird() {
        return rthird;
    }

    public Treponse rthird(Boolean rthird) {
        this.rthird = rthird;
        return this;
    }

    public void setRthird(Boolean rthird) {
        this.rthird = rthird;
    }

    public Boolean isRfourth() {
        return rfourth;
    }

    public Treponse rfourth(Boolean rfourth) {
        this.rfourth = rfourth;
        return this;
    }

    public void setRfourth(Boolean rfourth) {
        this.rfourth = rfourth;
    }

    public Tquestion getReponseQuestion() {
        return reponseQuestion;
    }

    public Treponse reponseQuestion(Tquestion tquestion) {
        this.reponseQuestion = tquestion;
        return this;
    }

    public void setReponseQuestion(Tquestion tquestion) {
        this.reponseQuestion = tquestion;
    }

    public Tresult getReponseResult() {
        return reponseResult;
    }

    public Treponse reponseResult(Tresult tresult) {
        this.reponseResult = tresult;
        return this;
    }

    public void setReponseResult(Tresult tresult) {
        this.reponseResult = tresult;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Treponse treponse = (Treponse) o;
        if (treponse.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), treponse.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Treponse{" +
            "id=" + getId() +
            ", rfirst='" + isRfirst() + "'" +
            ", rsecond='" + isRsecond() + "'" +
            ", rthird='" + isRthird() + "'" +
            ", rfourth='" + isRfourth() + "'" +
            "}";
    }
}
